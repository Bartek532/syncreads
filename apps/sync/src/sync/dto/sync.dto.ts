import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const syncFeedPayloadSchema = z.object({
  in: z.array(z.string().uuid()),
});

export const syncArticlePayloadSchema = z.object({
  url: z.string().url(),
});

export class SyncArticlePayloadDto extends createZodDto(
  syncArticlePayloadSchema,
) {}
export class SyncFeedPayloadDto extends createZodDto(syncFeedPayloadSchema) {}
