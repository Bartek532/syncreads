import { SyncStatus } from "@prisma/client";
import dayjs from "dayjs";
import Parser from "rss-parser";

import { PDF_OPTIONS } from "../../config/sync";
import { env } from "../../env/server.mjs";
import {
  getApi,
  getFolder,
  syncEntry,
} from "../../server/services/remarkable.service";
import {
  createSync,
  getPage,
  updateSync,
} from "../../server/services/sync.service";
import {
  getAllUsers,
  getUserById,
  getUserFeed,
  getUserFeeds,
  updateFeedSyncDate,
} from "../../server/services/user.service";
import { ApiError, HTTP_STATUS_CODE } from "../../utils/exceptions";
import { nonNullable } from "../../utils/functions";

import type { FeedArticle, FeedWithArticles } from "../../../types/feed.types";
import type { Feed } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Page } from "puppeteer-core";
import type { RemarkableApi } from "rmapi-js";

export const syncArticle = async ({
  article,
  api,
  page: passedPage,
  folderId = "",
}: {
  article: Omit<FeedArticle, "pubDate">;
  api: RemarkableApi;
  page?: Page;
  folderId?: string;
}) => {
  const page = passedPage ?? (await getPage());
  await page.goto(article.link, { waitUntil: "networkidle0", timeout: 0 });
  const pdf = await page.pdf(PDF_OPTIONS);
  const title = article.title ?? (await page.title());

  const pdfEntry = await api.putPdf(title, pdf, { parent: folderId });
  await syncEntry({ api, entry: pdfEntry });
};

const syncFeed = async ({
  url,
  userId,
  api,
  parser,
  page: passedPage,
  folderId,
}: {
  url: string;
  userId: number;
  api: RemarkableApi;
  parser: Parser;
  folderId: string;
  page?: Page;
}) => {
  const parsed = await parser.parseURL(url);
  const feed = await getUserFeed({ userId, url });
  const page = passedPage ?? (await getPage());

  if (!feed) {
    throw new ApiError(
      HTTP_STATUS_CODE.NOT_FOUND,
      `Feed ${url} not found for user with id ${userId}!`,
    );
  }

  const articles = parsed.items
    .filter((item): item is FeedArticle => !!item.link && !!item.pubDate)
    .filter((item, index) =>
      feed.lastSyncDate
        ? dayjs(item.pubDate).isAfter(feed.lastSyncDate)
        : index < feed.startArticlesCount,
    );

  for (const article of articles) {
    await syncArticle({ article, api, page, folderId });
  }

  await updateFeedSyncDate({
    userId,
    feedId: feed.feedId,
    date: articles[0] ? new Date(articles[0].pubDate) : new Date(),
  });

  return { url, articles };
};

export const syncUserFeeds = async ({
  id,
  feeds: passedFeeds,
  parser: passedParser,
  page: passedPage,
}: {
  id: number;
  feeds?: Omit<Feed, "id">[];
  parser?: Parser;
  page?: Page;
}) => {
  const parser = passedParser ?? new Parser();
  const page = passedPage ?? (await getPage());

  const user = await getUserById({ id });

  if (!user) {
    throw new ApiError(HTTP_STATUS_CODE.NOT_FOUND, "User not found!");
  }

  if (!user.device) {
    console.log(`Device not found for user ${user.email ?? user.id}!`);
    throw new ApiError(
      HTTP_STATUS_CODE.NOT_FOUND,
      "Device not found, register it first!",
    );
  }

  const feeds = passedFeeds ?? (await getUserFeeds({ id: user.id }));
  const sync = await createSync({ id: user.id });

  try {
    const api = await getApi({ token: user.device.token });

    const syncedFeeds: FeedWithArticles[] = [];

    const { documentId: folderId } = await getFolder({
      api,
      name: user.folder,
    });

    for (const feed of feeds) {
      const syncedFeed = await syncFeed({
        url: feed.url,
        userId: user.id,
        api,
        page,
        parser,
        folderId,
      });

      syncedFeeds.push(syncedFeed);
    }

    await updateSync({
      id: sync.id,
      data: {
        finishedAt: new Date(),
        syncedArticlesCount: syncedFeeds.map(({ articles }) => articles).flat()
          .length,
        status: SyncStatus.SUCCESS,
      },
    });

    return { id, feeds: syncedFeeds };
  } catch (e: unknown) {
    console.error(user, e);

    await updateSync({
      id: sync.id,
      data: {
        finishedAt: new Date(),
        status: SyncStatus.FAILED,
      },
    });

    return;
  }
};

const syncAll = async () => {
  console.time("sync");

  const parser = new Parser();
  const page = await getPage();

  const users = await getAllUsers();

  const data = await Promise.all(
    users.map(async ({ id }) => {
      try {
        const data = await syncUserFeeds({ id, parser, page });
        return data;
      } catch (e: unknown) {
        console.error(e);
        return;
      }
    }),
  );

  console.timeEnd("sync");

  return {
    data,
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

    const { data } = await syncAll();

    const syncedFeeds = data
      .filter(nonNullable)
      .map(({ feeds }) => feeds)
      .flat();
    const syncedArticles = syncedFeeds.map(({ articles }) => articles).flat();

    return res.status(200).json({
      status: "Success",
      message: `Successfully synced ${syncedFeeds.length} feed(s) - ${syncedArticles.length} article(s) for ${data.length} user(s)`,
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
