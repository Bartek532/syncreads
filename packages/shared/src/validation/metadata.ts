import { z } from "zod";

const userMetadataSchema = z.object({
  name: z.string(),
  folder: z.string(),
});

export type UserMetadata = z.infer<typeof userMetadataSchema>;

export const isUserMetadata = (value: unknown): value is UserMetadata => {
  return userMetadataSchema.safeParse(value).success;
};
