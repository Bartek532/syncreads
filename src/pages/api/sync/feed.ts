import { SyncStatus, SyncTrigger } from "@prisma/client";
import dayjs from "dayjs";
import { ApiError } from "next/dist/server/api-utils";
import Parser from "rss-parser";

import { createSyncLogger } from "../../../server/controllers/sync.controller";
import { getApi, getFolder } from "../../../server/services/remarkable.service";
import {
  createSync,
  getPage,
  updateSync,
} from "../../../server/services/sync.service";
import {
  getUserById,
  getUserFeed,
  getUserFeeds,
  updateFeedSyncDate,
} from "../../../server/services/user.service";
import { HTTP_STATUS_CODE } from "../../../utils/exceptions";
import { formatTime } from "../../../utils/functions";

import { syncArticle } from "./article";

import type {
  FeedArticle,
  FeedWithArticles,
} from "../../../../types/feed.types";
import type { Logger } from "../../../../types/log.types";
import type { Feed, Sync } from "@prisma/client";
import type { Page } from "puppeteer-core";
import type { RemarkableApi } from "rmapi-js";

const syncFeed = async ({
  url,
  userId,
  api,
  parser,
  page: passedPage,
  folderId,
  sync: passedSync,
  logger: passedLogger,
  trigger = SyncTrigger.MANUAL,
}: {
  url: string;
  userId: number;
  api: RemarkableApi;
  parser: Parser;
  folderId: string;
  page?: Page;
  sync?: Sync;
  logger?: Logger;
  trigger?: SyncTrigger;
}) => {
  const sync =
    passedSync ??
    (await createSync({
      id: userId,
      trigger,
    }));
  const logger = passedLogger ?? (await createSyncLogger(sync.id));

  const parsed = await parser.parseURL(url);
  const feed = await getUserFeed({ userId, url });
  const page = passedPage ?? (await getPage());

  const { updatedAt: feedSyncStartDate } = await logger.info(
    `Starting synchronization of feed with url ${url}...`,
  );

  if (!feed) {
    throw new ApiError(
      HTTP_STATUS_CODE.NOT_FOUND,
      `Feed ${url} not found for user with id ${userId}!`,
    );
  }

  await logger.info(
    feed.lastSyncDate
      ? `Syncing articles published after ${dayjs(feed.lastSyncDate).format(
          "DD-MM-YYYY",
        )}...`
      : `Syncing last ${feed.startArticlesCount} article(s)...`,
  );

  const articles = parsed.items
    .filter((item): item is FeedArticle => !!item.link && !!item.pubDate)
    .filter((item, index) =>
      feed.lastSyncDate
        ? dayjs(item.pubDate).isAfter(feed.lastSyncDate)
        : index < feed.startArticlesCount,
    );

  await logger.info(
    `Found ${articles.length} article(s) to synchronize within current feed.`,
  );

  for (const article of articles) {
    await syncArticle({ userId, article, api, page, folderId, sync, logger });
  }

  await updateFeedSyncDate({
    userId,
    feedId: feed.feedId,
    date: articles[0] ? new Date(articles[0].pubDate) : new Date(),
  });

  await logger.verbose(
    `Successfully synced feed ${url} including **${
      articles.length
    }** articles: ${formatTime(dayjs().diff(feedSyncStartDate, "ms"))}`,
  );

  return { url, articles };
};

export const syncUserFeeds = async ({
  id,
  feeds: passedFeeds,
  parser: passedParser,
  page: passedPage,
  trigger = SyncTrigger.MANUAL,
}: {
  id: number;
  feeds?: Omit<Feed, "id">[];
  parser?: Parser;
  page?: Page;
  trigger?: SyncTrigger;
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
  const sync = await createSync({ id: user.id, trigger });
  const logger = await createSyncLogger(sync.id);

  try {
    await logger.info("Feeds synchronization started.");
    await logger.info("Trying to connect to the reMarkable cloud...");
    const api = await getApi({ token: user.device.token });
    await logger.info("Connection to the reMarkable cloud is established.");

    const syncedFeeds: FeedWithArticles[] = [];

    const { documentId: folderId } = await getFolder({
      api,
      name: user.folder,
    });

    for (const feed of feeds) {
      const syncedFeed = await syncFeed({
        url: feed.url,
        userId: user.id,
        folderId,
        api,
        page,
        parser,
        sync,
        logger,
        trigger,
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

    await logger.info("Sync completed successfully:");
    await logger.info(` \\- Feeds: ${syncedFeeds.length}`);
    await logger.info(
      ` \\- Articles: ${
        syncedFeeds.map(({ articles }) => articles).flat().length
      }`,
    );
    await logger.info(
      `Total time: ${formatTime(dayjs().diff(sync.startedAt, "ms"))}`,
    );

    return { id, feeds: syncedFeeds };
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      await logger.error(e.message);
      if (e.stack) {
        await logger.error(`\`\`\`js
${e.stack}`);
      }
    } else {
      await logger.error(
        "Unknown error occured during synchronization! Try to sync once again.",
      );
    }

    await updateSync({
      id: sync.id,
      data: {
        finishedAt: new Date(),
        status: SyncStatus.FAILED,
      },
    });

    await logger.info("Sync exited with an error.");

    return;
  }
};
