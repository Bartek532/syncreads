import { TRPCError } from "@trpc/server";

import { createFeed, deleteFeed, getAllFeeds } from "../services/feed.service";

import type {
  CreateAndConnectFeedInput,
  ParamsInput,
} from "src/utils/validation";

export const createFeedHandler = async ({
  input,
}: {
  input: CreateAndConnectFeedInput;
}) => {
  try {
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
  params: ParamsInput;
}) => {
  try {
    const feed = await deleteFeed({ id: params.id });

    if (!feed) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that ID not found",
      });
    }

    return {
      status: "Success",
      message: `Successfully delete feed with id ${params.id}!`,
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
