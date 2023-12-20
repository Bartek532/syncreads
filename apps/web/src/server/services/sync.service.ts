import { env } from "@/lib/env";

import { supabase } from "../../lib/supabase/server";
import { ApiError, isSyncApiErrorResponse } from "../../utils/exceptions";

import type { SyncArticlePayload, SyncFeedPayload } from "@rssmarkable/shared";


export const getUserSyncs = ({ id }: { id: string }) => {
  return supabase()
    .from("Sync")
    .select("*")
    .eq("userId", id)
    .order("startedAt", { ascending: false });
};

export const queueArticleSync = async ({
  key,
  url,
}: { key: string } & SyncArticlePayload) => {
  const response = await fetch(`${env.SYNC_API_URL}/api/sync/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify({ url }),
  });

  const data: unknown = await response.json();

  if (isSyncApiErrorResponse(data)) {
    throw new ApiError(data.error.status, data.error.message);
  }

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return data;
};

export const queueFeedSync = async ({
  key,
  in: feeds,
}: { key: string } & SyncFeedPayload) => {
  const response = await fetch(`${env.SYNC_API_URL}/api/sync/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify({ in: feeds }),
  });

  const data: unknown = await response.json();

  if (isSyncApiErrorResponse(data)) {
    throw new ApiError(data.error.status, data.error.message);
  }

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return data;
};
