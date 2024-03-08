import { DeviceType } from "@rssmarkable/database";
import { z } from "zod";

import { FILE_TYPE } from "../../types/feed.types";

export const updateUserSchema = z.object({
  name: z
    .string()
    .max(30, "Name must not be longer than 30 characters.")
    .optional(),
  folder: z
    .string()
    .max(30, "Folder name must not be longer than 30 characters.")
    .optional(),
});

export const createFeedSchema = z.object({
  url: z
    .string({ required_error: "Url is required." })
    .min(1, "Url is required.")
    .url("Url must be a valid url."),
});

export const createAndConnectFeedSchema = createFeedSchema.extend({
  id: z.string(),
});

export const importFeedsSchema = z.object({
  content: z.string(),
  type: z.nativeEnum(FILE_TYPE),
});

export const importAndConnectFeedsSchema = importFeedsSchema.extend({
  id: z.string(),
});

export const deleteFeedsSchema = z.object({
  in: z.array(z.string().uuid()),
});

export const deleteAndDisconnectFeedsSchema = deleteFeedsSchema.extend({
  id: z.string(),
});

export const getUrlDetailsSchema = z.object({
  url: z.string().url(),
});

export const registerDeviceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(DeviceType.REMARKABLE),
    code: z
      .string()
      .min(8, "Enter valid one-time code.")
      .max(8, "Enter valid one-time code."),
  }),
  z.object({
    type: z.literal(DeviceType.KINDLE),
    email: z
      .string()
      .email("Enter valid email.")
      .regex(/@kindle.com$/, { message: "Enter valid Kindle email." }),
  }),
]);

export const saveDeviceSchema = z.object({
  type: z.nativeEnum(DeviceType),
  token: z.string(),
});

export const saveAndConnectDeviceSchema = saveDeviceSchema.extend({
  id: z.string(),
});

export const unregisterAndDisconnectDeviceSchema = z.object({
  id: z.string(),
});

export const getSyncSchema = z.object({
  id: z.string().uuid(),
});

export const getSyncLogSchema = z.object({
  syncId: z.string().uuid(),
});

export const limitSchema = z.object({
  limit: z.number().default(5),
});

export const cursorPaginationSchema = limitSchema.merge(
  z.object({
    cursor: z.string().optional(),
  }),
);

export const rangeSchema = z.object({
  from: z.date().optional(),
  to: z.date().optional(),
});
