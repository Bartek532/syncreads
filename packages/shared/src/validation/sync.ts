import { z } from "zod";

import { DEFAULT_OPTIONS, LOG_LEVEL, OUTPUT_FORMAT } from "../constants";

export const syncOptionsPayloadSchema = z.object({
  format: z
    .nativeEnum(OUTPUT_FORMAT)
    .optional()
    .default(DEFAULT_OPTIONS.format),
});

export const syncFeedPayloadSchema = z.object({
  in: z.array(z.string().uuid()),
  options: syncOptionsPayloadSchema.optional().default(DEFAULT_OPTIONS),
});

export const syncArticlePayloadSchema = z.object({
  url: z.string().min(1, "Url is required.").url("Url must be a valid url."),
  options: syncOptionsPayloadSchema.optional().default(DEFAULT_OPTIONS),
});

export const syncLogMessageSchema = z.object({
  level: z.nativeEnum(LOG_LEVEL),
  message: z.string(),
  date: z.string(),
});

export const syncApiResponseSchema = z.object({
  message: z.string(),
  sync: z.object({
    id: z.string().uuid(),
  }),
});

export type SyncFeedPayload = z.infer<typeof syncFeedPayloadSchema>;
export type SyncArticlePayload = z.infer<typeof syncArticlePayloadSchema>;
export type SyncOptionsPayload = z.infer<typeof syncOptionsPayloadSchema>;

export type SyncFeedInput = z.input<typeof syncFeedPayloadSchema>;
export type SyncArticleInput = z.input<typeof syncArticlePayloadSchema>;
export type SyncOptionsInput = z.input<typeof syncOptionsPayloadSchema>;

export type LogMessage = z.infer<typeof syncLogMessageSchema>;

export type SyncApiResponse = z.infer<typeof syncApiResponseSchema>;
