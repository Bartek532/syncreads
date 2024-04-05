import { HTTP_STATUS_CODE, ApiError } from "@syncreads/shared";
import urlMetadata from "url-metadata";

import type { UrlMetadata } from "@/types/feed.types";

import { createFeed, importStrategies } from "../services/feed/feed.service";
import { getUserFeedByUrl } from "../services/user.service";
import { getFavicon } from "../utils/parser";
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

  const { isFeed, parsed } = await isFeedUrl(url);

  if (!isFeed) {
    throw new ApiError(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "Error occured! Please check your provided url and try again!",
    );
  }

  const feed = await createFeed({ url, id, site: parsed.link ?? url });

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
  const { isFeed, response, parsed } = await isFeedUrl(url);

  if (!isFeed) {
    const preview = (await urlMetadata(null, {
      parseResponseObject: response,
    })) as UrlMetadata;

    return {
      status: "Success",
      data: {
        title: preview.title || null,
        description: preview.description || null,
        image: preview.image || preview["og:image"] || null,
        icon: getFavicon(url, preview.favicons),
        url,
      },
    };
  }

  const link = parsed.link ?? url;
  const preview = (await urlMetadata(link)) as UrlMetadata;

  return {
    status: "Success",
    data: {
      title: preview.title || parsed.title || null,
      description: preview.description || parsed.description || null,
      image: preview.image || preview["og:image"] || parsed.image?.url || null,
      icon: getFavicon(url, preview.favicons),
      url: link,
    },
  };
};
