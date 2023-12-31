"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/trpc/server";
import type {
  CreateFeedInput,
  DeleteFeedsInput,
} from "@/utils/validation/types";

export const createFeed = async (data: CreateFeedInput) => {
  const response = await api.feed.createFeed.mutate(data);
  revalidatePath("/dashboard/feeds");
  return response;
};

export const deleteFeeds = async (data: DeleteFeedsInput) => {
  const response = await api.user.deleteUserFeeds.mutate(data);
  revalidatePath("/dashboard/feeds");
  return response;
};

export const queueFeedSync = async (data: { in: string[] }) => {
  const response = await api.sync.queueFeedSync.mutate(data);
  revalidatePath("/dashboard/syncs");
  return response;
};
