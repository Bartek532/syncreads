"use server";

import { GENERIC_ERROR_MESSAGE } from "@rssmarkable/shared";
import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";
import type { CreateFeedInput } from "@/utils";

export const queueArticleSync = async (data: CreateFeedInput) => {
  try {
    const { message } = await api.sync.queueArticleSync.mutate(data);
    revalidatePath("/dashboard/syncs");
    return { message, success: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false };
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false };
  }
};
