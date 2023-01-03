import { webcrypto } from "crypto";
import dayjs from "dayjs";
import puppeteer, { type Page, type Browser } from "puppeteer-core";
import { remarkable, type RemarkableApi } from "rmapi-js";
import Parser from "rss-parser";

import { ApiError, HTTP_STATUS_CODE } from "src/utils/exceptions.js";

import { env } from "../../env/server.mjs";
import { prisma } from "../../server/db/client";
import { BROWSER_OPTIONS, PDF_OPTIONS } from "../../utils/consts";

import type { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface FeedItem {
  link: string;
  pubDate: string;
}

const syncArticle = async ({
  url,
  api,
  page,
}: {
  url: string;
  api: RemarkableApi;
  page: Page;
}) => {
  await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
  const pdf = await page.pdf(PDF_OPTIONS);

  const entry = await api.putPdf(url, pdf);
  const [root, gen] = await api.getRootHash();
  const rootEntries = await api.getEntries(root);
  rootEntries.push(entry);
  const { hash } = await api.putEntries("", rootEntries);
  const nextGen = await api.putRootHash(hash, gen);
  await api.syncComplete(nextGen);
};

const syncFeed = async ({
  url,
  user,
  api,
  parser,
  browser,
}: {
  url: string;
  user: User;
  api: RemarkableApi;
  parser: Parser;
  browser: Browser;
}) => {
  const parsed = await parser.parseURL(url);
  const items = parsed.items
    .filter((item): item is FeedItem => !!item.link && !!item.pubDate)
    .filter((item, index) =>
      user.lastSyncDate
        ? dayjs(item.pubDate).isAfter(user.lastSyncDate)
        : index < 1,
    );
  const page = await browser.newPage();
  for (const item of items) {
    await syncArticle({ url: item.link, api, page });
  }

  return items;
};

const syncUserFeeds = async ({
  email,
  parser: passedParser,
  browser: passedBrowser,
}: {
  email: string;
  parser?: Parser;
  browser?: Browser;
}) => {
  const parser = passedParser ?? new Parser();
  const browser = passedBrowser ?? (await puppeteer.launch(BROWSER_OPTIONS));

  const user = await prisma.user.findUnique({
    where: { email },
    include: { feeds: true, tokens: true },
  });

  if (!user?.email) {
    throw new Error(`User with email ${email} not found!`);
  }

  if (!user.tokens.length) {
    throw new Error(`Device token not found, register your device first!`);
  }

  const api = webcrypto
    ? await remarkable(user.tokens[0]!.token, {
        subtle: webcrypto.subtle,
      })
    : await remarkable(user.tokens[0]!.token);

  const syncedFeeds = await Promise.all(
    user.feeds.map((feed) =>
      syncFeed({ url: feed.url, user, api, parser, browser }),
    ),
  );

  const sortedFeedsDates = syncedFeeds
    .flat()
    .map((article) => article.pubDate)
    .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? -1 : 1));

  await prisma.user.update({
    where: { email: user.email },
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
  const browser = await puppeteer.launch(BROWSER_OPTIONS);

  const users = await prisma.user.findMany();

  const syncedFeeds = await Promise.all(
    users.map(({ email }) =>
      syncUserFeeds({ email: email ?? "", parser, browser }),
    ),
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
  res: NextApiResponse,
) {
  try {
    if (!(req.headers["api-key"] === env.API_KEY)) {
      throw new ApiError(HTTP_STATUS_CODE.UNAUTHORIZED, "Missing api key!");
    }

    const {
      stats: { users, feeds, articles },
    } = await syncAll();

    return res.status(200).json({
      status: "Success",
      message: `Successfully synced ${feeds} feed(s) - ${articles} article(s) for ${users} user(s)`,
    });
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof ApiError) {
      return res.status(e.status).json({ status: "Error", message: e.message });
    }

    if (e instanceof Error) {
      return res.status(500).json({ status: "Error", message: e.message });
    }

    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
}
