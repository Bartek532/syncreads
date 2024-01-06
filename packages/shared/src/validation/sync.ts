import { z } from "zod";

import { LOG_LEVEL } from "../constants";

export const syncFeedPayloadSchema = z.object({
  in: z.array(z.string().uuid()),
});

export const syncArticlePayloadSchema = z.object({
  url: z.string().min(1, "Url is required.").url("Url must be a valid url."),
});

export const syncLogMessageSchema = z.object({
  level: z.nativeEnum(LOG_LEVEL),
  message: z.string(),
  date: z.string(),
});

export type SyncFeedPayload = z.infer<typeof syncFeedPayloadSchema>;
export type SyncArticlePayload = z.infer<typeof syncArticlePayloadSchema>;
export type LogMessage = z.infer<typeof syncLogMessageSchema>;
