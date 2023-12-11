import { z } from "zod";

import { FILE_TYPE } from "../../types/feed.types";
import { LOG_LEVEL } from "../../types/log.types";

export const createFeedSchema = z.object({
  url: z.string().min(1, "Url is required.").url("Url must be a valid url."),
});

export const createAndConnectSchema = z.object({
  url: z.string().url(),
  id: z.number(),
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

export const offsetPaginationSchema = z.object({
  perPage: z.number().min(1).max(100).nullish(),
  page: z.number().nullish(),
});

export const logMessageSchema = z.object({
  message: z.string(),
  date: z.string().datetime(),
  level: z.nativeEnum(LOG_LEVEL),
});
