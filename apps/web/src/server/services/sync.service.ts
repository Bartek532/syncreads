import dayjs from "dayjs";

import { env } from "@/lib/env/server";
import type { RangeInput } from "@/utils";

import { supabase } from "../../lib/supabase/server";
import { ApiError, isSyncApiErrorResponse } from "../utils/exceptions";

import type { Article, Sync } from "@rssmarkable/database";
import type { SyncArticlePayload, SyncFeedPayload } from "@rssmarkable/shared";

export const getUserSyncs = ({ id, from, to }: RangeInput & { id: string }) => {
  const query = supabase()
    .from("Sync")
    .select("*, articles:Article(url)")
    .eq("userId", id)
    .order("startedAt", { ascending: false });

  if (from && to) {
    void query
      .gte("startedAt", dayjs(from).toISOString())
      .lte("startedAt", dayjs(to).toISOString())
      .returns<Array<Sync & { articles: Article[] }>>();
  }

  return query;
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
