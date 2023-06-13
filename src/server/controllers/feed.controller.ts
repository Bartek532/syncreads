import { SyncStatus, SyncTrigger } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import { parse } from "rss-to-json";

import { syncArticle } from "../../pages/api/sync/article";
import { ApiError, HTTP_STATUS_CODE } from "../../utils/exceptions";
import { formatTime } from "../../utils/functions";
import { importStrategies } from "../services/feed/feed.service";
import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeedByUrl,
} from "../services/feed/feed.service";
import { getApi } from "../services/remarkable.service";
import { createSync, updateSync } from "../services/sync.service";
import {
  deleteFeedFromUser,
  getUserById,
  getUserFeedByUrl,
} from "../services/user.service";

import { createSyncLogger } from "./sync.controller";

import type { FeedApi } from "../../../types/feed.types";
import type {
  CreateAndConnectFeedInput,
  DeleteAndDisconnectFeedInput,
  GetWebsiteDetailsInput,
  ImportAndConnectFeedsInput,
  SyncArticleInput,
} from "../../utils/validation/types";

export const createFeedHandler = async ({
  url,
  id,
}: CreateAndConnectFeedInput) => {
  try {
    const isFeedExists = await getUserFeedByUrl({ url, id });
    if (isFeedExists) {
      console.log("exists", url);
      throw new TRPCError({
        code: "CONFLICT",
        message: "You've already added this feed!",
      });
    }

    const response = await fetch(url);

    if (
      response.status !== HTTP_STATUS_CODE.OK ||
      !response.headers.get("content-type")?.includes("xml")
    ) {
      console.log(url);
      throw new ApiError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Error occured! Please check your provided url and try again!",
      );
    }

    const feed = await createFeed({ url, id });

    return {
      status: "Success",
      message: `Successfully added feed!`,
      feed,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const importFeedsHandler = async ({
  content,
  id,
  type,
}: ImportAndConnectFeedsInput) => {
  try {
    const urls = importStrategies[type].parse(content);

    const results = await Promise.allSettled(
      urls.map((url) => createFeedHandler({ url, id })),
    );

    const addedFeeds = results.filter(({ status }) => status === "fulfilled");

    if (!addedFeeds.length) {
      throw new ApiError(
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Feeds import failed!",
      );
    }

    return {
      status: "Success",
      message: `Successfully added ${addedFeeds.length}/${urls.length} feed(s)!`,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteFeedHandler = async ({
  url,
  id,
}: DeleteAndDisconnectFeedInput) => {
  try {
    const feed = await getFeedByUrl({ url });
    if (!feed) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that ID not found",
      });
    }

    if (feed.users.length > 1) {
      await deleteFeedFromUser({ id, url });
    } else {
      await deleteFeed({ url });
    }

    return {
      status: "Success",
      message: `Successfully deleted feed!`,
      feed,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const syncArticleHandler = async ({
  id,
  url,
}: SyncArticleInput & { id: number }) => {
  try {
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

    const api = await getApi({ token: user.device.token });
    const sync = await createSync({ id: user.id, trigger: SyncTrigger.MANUAL });
    const logger = await createSyncLogger(sync.id);

    try {
      await syncArticle({
        article: { link: url },
        api,
        userId: user.id,
        sync,
        logger,
      });

      await updateSync({
        id: sync.id,
        data: {
          finishedAt: new Date(),
          syncedArticlesCount: 1,
          status: SyncStatus.SUCCESS,
        },
      });

      await logger.info(
        `Sync completed successfully: ${formatTime(
          dayjs().diff(sync.startedAt, "ms"),
        )}`,
      );

      return {
        status: "Success",
        message: `Successfully synced article!`,
        url,
      };
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

      return {
        status: "Error",
        message: `Error occurred during article sync!`,
        url,
      };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getFeedDetailsHandler = async ({
  url,
}: GetWebsiteDetailsInput) => {
  try {
    const feed = (await parse(url)) as FeedApi; // TODO: fix title

    return {
      status: "Success",
      feed: {
        title: feed.title,
        description: feed.description,
        image: feed.image,
        url: feed.link,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllFeedsHandler = async () => {
  try {
    const feeds = await getAllFeeds();

    return {
      status: "Success",
      feeds,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
