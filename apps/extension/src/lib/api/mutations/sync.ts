import {
  ApiError,
  isSyncApiErrorResponse,
  syncApiResponseSchema,
  type SyncArticleInput,
} from "@syncreads/shared";

import { env } from "@/lib/env";
import { supabase } from "@/lib/supabase";

const getUserApiKey = async (id: string) => {
  return supabase.from("ApiKey").select("key").eq("userId", id).single();
};

const queueArticleSync = async ({
  key,
  ...input
}: { key: string } & SyncArticleInput) => {
  const response = await fetch(`${env.VITE_SYNC_API_URL}/api/sync/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify(input),
  });

  const data: unknown = await response.json();

  if (isSyncApiErrorResponse(data)) {
    throw new ApiError(data.error.status, data.error.message);
  }

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return syncApiResponseSchema.parse(data);
};

export const syncArticle = async ({
  userId,
  input,
}: {
  userId: string;
  input: SyncArticleInput;
}) => {
  const { data, error, status } = await getUserApiKey(userId);

  if (error) {
    throw new ApiError(status, error.message);
  }

  const { sync } = await queueArticleSync({
    key: data.key,
    ...input,
  });

  return sync;
};
