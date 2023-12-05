import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const syncArticlePayloadSchema = z.object({
  userId: z.string().uuid(),
  url: z.string().url(),
});

export class SyncArticlePayloadDto extends createZodDto(
  syncArticlePayloadSchema,
) {}
