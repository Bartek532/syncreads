import { z } from "zod";

export const syncApiResponseSchema = z.object({
  message: z.string(),
  sync: z.object({
    id: z.string().uuid(),
  }),
});
