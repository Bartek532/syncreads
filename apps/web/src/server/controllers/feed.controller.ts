import { HTTP_STATUS_CODE, ApiError } from "@rssmarkable/shared";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { parse } from "rss-to-json";

import type { FeedApi } from "@/types/feed.types";

import { createFeed, importStrategies } from "../services/feed/feed.service";
import { getUserFeedByUrl } from "../services/user.service";
import { isFeedUrl } from "../utils/validation";

import type {
  CreateAndConnectFeedInput,
  GetUrlDetailsInput,
  ImportAndConnectFeedsInput,
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

  const { isFeed } = await isFeedUrl(url);

  if (!isFeed) {
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

export const importFeedsHandler = async ({
  content,
  id,
  type,
}: ImportAndConnectFeedsInput) => {
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
    message: `Successfully uploaded ${addedFeeds.length}/${urls.length} feed(s)!`,
  };
};

export const getUrlDetailsHandler = async ({ url }: GetUrlDetailsInput) => {
  const { isFeed, response } = await isFeedUrl(url);

  if (!isFeed) {
    const preview = await getPreviewFromContent(response, {
      followRedirects: "follow",
      timeout: 1500,
    });

    return {
      status: "Success",
      data: {
        title: "title" in preview ? preview.title : "",
        description: "description" in preview ? preview.description : "",
        image: "images" in preview ? preview.images[0] : "",
        icon: preview.favicons[0],
        url,
      },
    };
  }

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
    timeout: 1500,
  });

  return {
    status: "Success",
    data: {
      title: typeof feed.title === "string" ? feed.title : feed.title.$text,
      description:
        "description" in preview
          ? preview.description ?? feed.description
          : feed.description,
      image: "images" in preview ? preview.images[0] : feed.image,
      icon: preview.favicons[0],
      url: link,
    },
  };
};
