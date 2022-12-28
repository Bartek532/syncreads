import { remarkable, type RemarkableApi } from "rmapi-js";
import { webcrypto } from "crypto";
import Parser from "rss-parser";
import { prisma } from "../../server/db/client";
import type { User } from "@prisma/client";
import { PDF_OPTIONS } from "../../utils/consts";
import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { env } from "../../env/server.mjs";
import pdf from "html-pdf";
import { parseHtml } from "../../utils/functions";

type FeedItem = {
  link: string;
  pubDate: string;
};

const syncArticle = async ({
  url,
  api,
}: {
  url: string;
  api: RemarkableApi;
}) => {
  const response = await fetch(url);
  const html = await response.text();
  const htmlToParse = parseHtml(html);

  pdf.create(htmlToParse, PDF_OPTIONS).toBuffer(async (err, buffer) => {
    if (err) throw err;

    const entry = await api.putPdf(url, buffer);
    const [root, gen] = await api.getRootHash();
    const rootEntries = await api.getEntries(root);
    rootEntries.push(entry);
    const { hash } = await api.putEntries("", rootEntries);
    const nextGen = await api.putRootHash(hash, gen);
    await api.syncComplete(nextGen);
  });
};

const syncFeed = async ({
  url,
  user,
  api,
  parser,
}: {
  url: string;
  user: User;
  api: RemarkableApi;
  parser: Parser;
}) => {
  const parsed = await parser.parseURL(url);
  const items = parsed.items
    .filter((item): item is FeedItem => !!item.link && !!item.pubDate)
    .filter((item, index) =>
      user.lastSyncDate
        ? dayjs(item.pubDate).isAfter(user.lastSyncDate)
        : index < 1
    );

  for (const item of items) {
    await syncArticle({ url: item.link, api });
  }

  return items;
};

const syncUserFeeds = async ({
  username,
  parser: passedParser,
}: {
  username: string;
  parser?: Parser;
}) => {
  const parser = passedParser || new Parser();

  const user = await prisma.user.findUnique({
    where: { username },
    include: { feeds: true },
  });

  if (!user) {
    throw new Error(`User ${username} not found!`);
  }

  const api = webcrypto
    ? await remarkable(user.deviceToken, {
        subtle: webcrypto.subtle,
      })
    : await remarkable(user.deviceToken);

  const syncedFeeds = await Promise.all(
    user.feeds.map((feed) => syncFeed({ url: feed.url, user, api, parser }))
  );

  const sortedFeedsDates = syncedFeeds
    .flat()
    .map((article) => article.pubDate)
    .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? -1 : 1));

  await prisma.user.update({
    where: { username: user.username },
    data: {
      lastSyncDate: sortedFeedsDates[0]
        ? new Date(sortedFeedsDates[0])
        : new Date(),
    },
  });

  return syncedFeeds;
};

const syncAll = async () => {
  const parser = new Parser();

  const users = await prisma.user.findMany();

  const syncedFeeds = await Promise.all(
    users.map(({ username }) => syncUserFeeds({ username, parser }))
  );

  return {
    stats: {
      users: users.length,
      feeds: syncedFeeds.flat().length,
      articles: syncedFeeds.flat(2).length,
    },
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!(req.headers["api-key"] === env.API_KEY)) {
      throw new Error("Missing api key!");
    }

    const {
      stats: { users, feeds, articles },
    } = await syncAll();

    return res.status(200).json({
      status: "Success",
      message: `Successfully synced ${feeds} feed(s) - ${articles} article(s) for ${users} user(s)`,
    });
  } catch (e: any) {
    console.log(e);

    return res
      .status(e?.status || 400)
      .json({ status: "error", message: e?.message || "Bad request" });
  }
}
