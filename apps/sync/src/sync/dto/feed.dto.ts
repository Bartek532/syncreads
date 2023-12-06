import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const syncFeedPayloadSchema = z.object({
  userId: z.string().uuid(),
  in: z.array(z.string().uuid()),
});

export class SyncFeedPayloadDto extends createZodDto(syncFeedPayloadSchema) {}
