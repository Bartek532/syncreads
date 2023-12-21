import { ApiError } from "@/utils/exceptions";

import {
  getUserSyncs,
  queueArticleSync,
  queueFeedSync,
} from "../services/sync.service";
import { getUserApiKey } from "../services/user.service";

import type { SyncArticlePayload, SyncFeedPayload } from "@rssmarkable/shared";

export const getUserSyncsHandler = async ({ id }: { id: string }) => {
  const { data, error, status } = await getUserSyncs({
    id,
  });

  if (error) {
    throw new ApiError(status, error.message);
  }

  return data;
};

export const queueArticleSyncHandler = async ({
  id,
  url,
}: { id: string } & SyncArticlePayload) => {
  const { data, error, status } = await getUserApiKey({ id });

  if (error) {
    throw new ApiError(status, error.message);
  }

  const sync: unknown = await queueArticleSync({
    key: data.key,
    url,
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

  const sync: unknown = await queueFeedSync({
    key: data.key,
    in: feeds,
  });

  return {
    status: "Success",
    message: "Feed sync succesfully queued!",
    sync,
  };
};
