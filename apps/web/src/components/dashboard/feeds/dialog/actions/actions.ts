"use server";

import { revalidatePath } from "next/cache";

import type { CreateFeedInput } from "@/utils/validation/types";

import { api } from "@/trpc/server";

export const createFeed = async (data: CreateFeedInput) => {
  const response = await api.feed.createFeed.mutate(data);
  revalidatePath("/dashboard/feeds");
  return response;
};
