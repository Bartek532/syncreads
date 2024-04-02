import {
  HTTP_STATUS_CODE,
  ApiError,
  isSyncApiErrorResponse,
  syncApiResponseSchema,
  type SyncArticleInput,
  type SyncFeedInput,
} from "@syncreads/shared";

import { env } from "@/lib/env/server";
import { supabase } from "@/lib/supabase/server";
import type { GetSyncInput, GetSyncLogInput } from "@/utils";

export const queueArticleSync = async ({
  key,
  ...input
}: { key: string } & SyncArticleInput) => {
  const response = await fetch(`${env.SYNC_API_URL}/api/sync/article`, {
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

export const queueFeedSync = async ({
  key,
  ...input
}: { key: string } & SyncFeedInput) => {
  const response = await fetch(`${env.SYNC_API_URL}/api/sync/feed`, {
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

export const getSyncById = async ({ id }: GetSyncInput) => {
  return supabase().from("Sync").select("*").eq("id", id).maybeSingle();
};

export const getSyncLog = async ({ syncId }: GetSyncLogInput) => {
  return supabase()
    .from("Log")
    .select("*")
    .eq("syncId", syncId)
    .order("createdAt", { ascending: false });
};

export const getSyncOptions = async () => {
  const { data, error } = await supabase().auth.getUser();

  if (error) {
    throw new ApiError(
      error.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }

  return data.user.user_metadata;
};
