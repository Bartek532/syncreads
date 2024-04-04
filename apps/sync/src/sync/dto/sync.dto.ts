import {
  syncArticlePayloadSchema,
  syncFeedPayloadSchema,
} from "@syncreads/shared";
import { createZodDto } from "nestjs-zod";

export class SyncArticlePayloadDto extends createZodDto(
  syncArticlePayloadSchema,
) {}
export class SyncFeedPayloadDto extends createZodDto(syncFeedPayloadSchema) {}
