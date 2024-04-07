import { z } from "zod";

import { OUTPUT_FORMAT } from "../constants";

const userMetadataSchema = z.object({
  name: z.string(),
  folder: z.object({
    name: z.string(),
    root: z.boolean().default(true),
  }),
  format: z.nativeEnum(OUTPUT_FORMAT),
});

export type UserMetadata = z.infer<typeof userMetadataSchema>;

export const isUserMetadata = (value: unknown): value is UserMetadata => {
  return userMetadataSchema.safeParse(value).success;
};
