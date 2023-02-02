import { TRPCError } from "@trpc/server";
import { parse } from "rss-to-json";

import { ApiError, HTTP_STATUS_CODE } from "../../utils/exceptions";
import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeedByUrl,
} from "../services/feed.service";
import { deleteFeedFromUser, getUserFeedByUrl } from "../services/user.service";

import type { FeedApi } from "../../../types/feed.types";
import type {
  CreateAndConnectFeedInput,
  DeleteAndDisconnectFeedInput,
  GetWebsiteDetailsInput,
} from "../../utils/validation";

export const createFeedHandler = async ({
  url,
  id,
}: CreateAndConnectFeedInput) => {
  try {
    const isFeedExists = await getUserFeedByUrl({ url, id });
    if (isFeedExists) {
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

export const getFeedDetailsHandler = async ({
  url,
}: GetWebsiteDetailsInput) => {
  try {
    //const { origin } = new URL(url);
    //const website = (await getLinkPreview(origin)) as LinkPreview;
    const feed = (await parse(url)) as FeedApi;

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
