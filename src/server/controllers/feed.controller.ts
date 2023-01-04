import { TRPCError } from "@trpc/server";

import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeedById,
  getFeedByUrl,
} from "../services/feed.service";
import { deleteFeedFromUser, getUserFeedByUrl } from "../services/user.service";

import type {
  CreateAndConnectFeedInput,
  DeleteFeedInput,
} from "src/utils/validation";

export const createFeedHandler = async ({
  input,
}: {
  input: CreateAndConnectFeedInput;
}) => {
  try {
    const isFeedExists = await getUserFeedByUrl(input);
    if (isFeedExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "You've already added this feed!",
      });
    }
    const feed = await createFeed(input);

    return {
      status: "Success",
      message: `Successfully created feed!`,
      feed,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteFeedHandler = async ({
  params,
}: {
  params: DeleteFeedInput;
}) => {
  try {
    const feed = await getFeedByUrl({ url: params.url });
    if (!feed) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that ID not found",
      });
    }

    if (feed.users.length > 1) {
      await deleteFeedFromUser(params);
    } else {
      await deleteFeed({ url: params.url });
    }

    return {
      status: "Success",
      message: `Successfully delete feed with url ${params.url}!`,
      data: null,
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
