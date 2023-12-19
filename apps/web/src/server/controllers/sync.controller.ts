import { getUserSyncs, queueArticleSync } from "../services/sync.service";
import { getUserApiKey } from "../services/user.service";

import type { SyncArticlePayload } from "@rssmarkable/shared";

import { ApiError } from "@/utils/exceptions";

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
  try {
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};
