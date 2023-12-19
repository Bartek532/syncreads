import { z } from "zod";

export const syncFeedPayloadSchema = z.object({
  in: z.array(z.string().uuid()),
});

export const syncArticlePayloadSchema = z.object({
  url: z.string().min(1, "Url is required.").url("Url must be a valid url."),
});

export type SyncFeedPayload = z.infer<typeof syncFeedPayloadSchema>;
export type SyncArticlePayload = z.infer<typeof syncArticlePayloadSchema>;
