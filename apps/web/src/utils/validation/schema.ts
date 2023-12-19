import { z } from "zod";

import { FILE_TYPE } from "../../types/feed.types";
import { FEEDS_PAGINATION_DEFAULT_PER_PAGE } from "../../config/dashboard";

export const createFeedSchema = z.object({
  url: z.string().min(1, "Url is required.").url("Url must be a valid url."),
});

export const createAndConnectSchema = z.object({
  url: z.string().url(),
  id: z.string(),
});

export const importFeedsSchema = z.object({
  content: z.string(),
  type: z.nativeEnum(FILE_TYPE),
});

export const importAndConnectFeedsSchema = z.object({
  content: z.string(),
  type: z.nativeEnum(FILE_TYPE),
  id: z.number(),
});

export const deleteFeedSchema = z.object({
  url: z.string().url(),
});

export const deleteAndDisconnectFeedSchema = z.object({
  url: z.string().url(),
  id: z.number(),
});

export const getWebsiteDetailsSchema = z.object({
  url: z.string().url(),
});

export const registerDeviceSchema = z.object({
  code: z
    .string()
    .min(8, "Enter valid one-time code.")
    .max(8, "Enter valid one-time code."),
});

export const registerAndConnectDeviceSchema = z.object({
  code: z
    .string()
    .min(8, "Enter valid one-time code.")
    .max(8, "Enter valid one-time code."),
  id: z.string(),
});

export const unregisterAndDisconnectDeviceSchema = z.object({
  id: z.string(),
});

export const syncArticleSchema = z.object({
  url: z.string().min(1, "Url is required.").url("Url must be a valid url."),
});

export const cursorPaginationSchema = z.object({
  limit: z.number().default(FEEDS_PAGINATION_DEFAULT_PER_PAGE),
  cursor: z.string().optional(),
});
