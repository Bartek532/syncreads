import { z } from "zod";

export const profileSchema = z.object({
  name: z.string({ required_error: "This field is required." }).max(30, {
    message: "Name must not be longer than 30 characters.",
  }),
  folder: z.string({ required_error: "This field is required." }).max(30, {
    message: "Folder name must not be longer than 30 characters.",
  }),
});

export type ProfileData = z.infer<typeof profileSchema>;
