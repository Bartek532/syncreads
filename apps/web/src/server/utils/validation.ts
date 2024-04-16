import { HTTP_STATUS_CODE, syncLogMessageSchema } from "@syncreads/shared";

import { fetcher } from "./fetcher";
import { parseFeedFromString } from "./parser";

import type { LogMessage } from "@syncreads/shared";

export const isFeedUrl = async (url: string) => {
  const response = await fetcher(url);

  const isFeed =
    response.status === HTTP_STATUS_CODE.OK &&
    response.headers.get("content-type")?.includes("xml");

  if (isFeed) {
    const data = await response.text();
    const parsed = await parseFeedFromString(data);

    return {
      isFeed,
      response,
      parsed,
    };
  }

  return {
    isFeed,
    response,
    parsed: null,
  };
};

export const isLogMessage = (message: unknown): message is LogMessage =>
  syncLogMessageSchema.safeParse(message).success;
