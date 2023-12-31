import { HTTP_STATUS_CODE } from "@rssmarkable/shared";
import { getLinkPreview } from "link-preview-js";
import { parse } from "rss-to-json";

import type { FeedApi } from "@/types/feed.types";

import { createFeed } from "../services/feed/feed.service";
import { getUserFeedByUrl } from "../services/user.service";
import { ApiError } from "../utils/exceptions";

import type {
  CreateAndConnectFeedInput,
  GetWebsiteDetailsInput,
} from "../../utils/validation/types";

export const createFeedHandler = async ({
  url,
  id,
}: CreateAndConnectFeedInput) => {
  const { data: isFeedExists } = await getUserFeedByUrl({ url, id });
  if (isFeedExists) {
    throw new ApiError(
      HTTP_STATUS_CODE.CONFLICT,
      "You've already added this feed!",
    );
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
};

export const getFeedDetailsHandler = async ({
  url,
}: GetWebsiteDetailsInput) => {
  const feed = (await parse(url)) as FeedApi;
  const link =
    typeof feed.link === "string"
      ? feed.link
      : feed.link
      ? feed.link.find(({ rel }) => rel === "alternate")?.href
        ? feed.link.find(({ rel }) => rel === "alternate")?.href
        : feed.link[0]?.href
      : url;

  const preview = await getLinkPreview(link ?? url, {
    followRedirects: "follow",
  });

  return {
    status: "Success",
    feed: {
      title: typeof feed.title === "string" ? feed.title : feed.title.$text,
      description:
        "description" in preview
          ? preview.description ?? feed.description
          : feed.description,
      image: "images" in preview ? preview.images[0] : feed.image,
      url: link,
    },
  };
};
