import {
  HTTP_STATUS_CODE,
  type SyncArticlePayload,
  type SyncFeedPayload,
} from "@rssmarkable/shared";

import { ApiError } from "@/server/utils/exceptions";
import type { GetSyncInput, GetSyncLogInput } from "@/utils";

import {
  getSyncById,
  getSyncLog,
  getSyncOptions,
  queueArticleSync,
  queueFeedSync,
} from "../services/sync.service";
import { getUserApiKey } from "../services/user.service";
import { isLogMessage } from "../utils/validation";

import type { LogMessage } from "@rssmarkable/shared";

export const queueArticleSyncHandler = async ({
  id,
  url,
}: { id: string } & SyncArticlePayload) => {
  const { data, error, status } = await getUserApiKey({ id });
  const options = await getSyncOptions();

  if (error) {
    throw new ApiError(status, error.message);
  }

  const { sync } = await queueArticleSync({
    key: data.key,
    url,
    options,
  });

  return {
    status: "Success",
    message: "Article sync succesfully queued!",
    sync,
  };
};

export const queueFeedSyncHandler = async ({
  id,
  in: feeds,
}: { id: string } & SyncFeedPayload) => {
  const { data, error, status } = await getUserApiKey({ id });

  if (error) {
    throw new ApiError(status, error.message);
  }

  const { sync } = await queueFeedSync({
    key: data.key,
    in: feeds,
  });

  return {
    status: "Success",
    message: "Feed sync succesfully queued!",
    sync,
  };
};

export const getSyncHandler = async ({ id }: GetSyncInput) => {
  const { data, error, status } = await getSyncById({ id });

  if (error) {
    throw new ApiError(status, error.message);
  }

  return {
    status: "Success",
    data,
  };
};

export const getSyncLogHandler = async ({ syncId }: GetSyncLogInput) => {
  const { data, error, status } = await getSyncLog({ syncId });

  if (error) {
    throw new ApiError(status, error.message);
  }

  const logs = data.map((l) => l.json);

  for (const log of logs) {
    const lines: unknown = JSON.parse(log?.toString() ?? "[]");

    if (!Array.isArray(lines)) {
      throw new ApiError(
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Failed to parse sync log.",
      );
    }

    if (lines.some((line) => !isLogMessage(line))) {
      throw new ApiError(
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "Failed to parse sync log.",
      );
    }
  }

  return {
    status: "Success",
    data: data.map((l) => ({
      ...l,
      json: JSON.parse(l.json?.toString() ?? "[]") as LogMessage[],
    })),
  };
};
