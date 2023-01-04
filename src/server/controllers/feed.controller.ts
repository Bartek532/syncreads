import { TRPCError } from "@trpc/server";

import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeedByUrl,
} from "../services/feed.service";
import { deleteFeedFromUser, getUserFeedByUrl } from "../services/user.service";

import type {
  CreateAndConnectFeedInput,
  DeleteAndDisconnectInput,
} from "src/utils/validation";

export const createFeedHandler = async ({
  url,
  email,
}: CreateAndConnectFeedInput) => {
  try {
    const isFeedExists = await getUserFeedByUrl({ url, email });
    if (isFeedExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "You've already added this feed!",
      });
    }
    const feed = await createFeed({ url, email });

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

export const deleteFeedHandler = async ({
  url,
  email,
}: DeleteAndDisconnectInput) => {
  try {
    const feed = await getFeedByUrl({ url });
    if (!feed) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that ID not found",
      });
    }

    if (feed.users.length > 1) {
      await deleteFeedFromUser({ email, url });
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
