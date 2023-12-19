import { supabase } from "../../lib/supabase/server";

import type { SyncArticlePayload } from "@rssmarkable/shared";

import { env } from "@/lib/env";

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

  return response.json();
};
