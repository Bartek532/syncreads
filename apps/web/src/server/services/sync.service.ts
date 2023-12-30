import dayjs from "dayjs";

import { env } from "@/lib/env/server";
import type { GetSyncsInput } from "@/utils";

import { supabase } from "../../lib/supabase/server";
import { ApiError, isSyncApiErrorResponse } from "../utils/exceptions";

import type { SyncArticlePayload, SyncFeedPayload } from "@rssmarkable/shared";

export const getUserSyncs = ({
  id,
  from,
  to,
  withArticles,
}: GetSyncsInput & { id: string }) => {
  const select = withArticles ? "*, Article (syncId, url)" : "*";
  if (from && to) {
    return supabase()
      .from("Sync")
      .select(select)
      .eq("userId", id)
      .gte("startedAt", dayjs(from).toISOString())
      .lte("startedAt", dayjs(to).toISOString())
      .order("startedAt", { ascending: false });
  }

  return supabase()
    .from("Sync")
    .select(select)
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
