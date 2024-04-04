"use server";

import { GENERIC_ERROR_MESSAGE } from "@syncreads/shared";
import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";

import type { SyncArticleInput, SyncFeedInput } from "@syncreads/shared";

export const queueArticleSync = async (data: SyncArticleInput) => {
  try {
    const { message, sync } = await api.sync.queueArticleSync.mutate(data);
    revalidatePath("/dashboard/syncs");
    return { message, success: true, sync } as const;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false } as const;
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false } as const;
  }
};

export const queueFeedSync = async (data: SyncFeedInput) => {
  try {
    const { message, sync } = await api.sync.queueFeedSync.mutate(data);
    revalidatePath("/dashboard/syncs");
    return { message, success: true, sync } as const;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false } as const;
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false } as const;
  }
};
