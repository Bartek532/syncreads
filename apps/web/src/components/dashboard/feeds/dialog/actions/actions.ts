"use server";

import type { CreateFeedInput } from "@/utils/validation/types";

import { api } from "@/trpc/server";

export const createFeed = async (data: CreateFeedInput) =>
  api.feed.createFeed.mutate(data);
