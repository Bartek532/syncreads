"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";

import type { SyncArticlePayload } from "@rssmarkable/shared";

export const queueArticleSync = async (data: SyncArticlePayload) => {
  const response = await api.sync.queueArticleSync.mutate(data);
  revalidatePath("/dashboard/syncs");
  return response;
};
