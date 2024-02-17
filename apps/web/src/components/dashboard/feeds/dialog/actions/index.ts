"use server";

import { GENERIC_ERROR_MESSAGE } from "@rssmarkable/shared";
import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";
import type {
  CreateFeedInput,
  DeleteFeedsInput,
  ImportFeedsInput,
} from "@/utils";

export const addFeed = async (data: CreateFeedInput) => {
  try {
    const { message } = await api.feed.createFeed.mutate(data);
    revalidatePath("/dashboard/feeds");
    return { message, success: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false };
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false };
  }
};

export const importFeeds = async (data: ImportFeedsInput) => {
  try {
    const { message } = await api.feed.importFeeds.mutate(data);
    revalidatePath("/dashboard/feeds");
    return { message, success: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false };
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false };
  }
};

export const deleteFeeds = async (data: DeleteFeedsInput) => {
  try {
    const { message } = await api.user.deleteUserFeeds.mutate(data);
    revalidatePath("/dashboard/feeds");
    return { message, success: true };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message, success: false };
    }

    return { message: GENERIC_ERROR_MESSAGE, success: false };
  }
};
