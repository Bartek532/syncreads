import { OUTPUT_FORMAT } from "@syncreads/shared";
import { z } from "zod";

export enum THEME {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export const appearanceSchema = z.object({
  theme: z.nativeEnum(THEME),
});

export const profileSchema = z.object({
  name: z.string({ required_error: "This field is required." }).max(30, {
    message: "Name must not be longer than 30 characters.",
  }),
  folder: z.discriminatedUnion("root", [
    z.object({
      name: z
        .string({
          required_error:
            "This field is required if not root folder is chosen.",
        })
        .min(1, {
          message:
            "Folder name must not be empty if not root folder is chosen.",
        })
        .max(30, {
          message: "Folder name must not be longer than 30 characters.",
        }),
      root: z.literal(false),
    }),
    z.object({
      root: z.literal(true),
    }),
  ]),
  format: z.nativeEnum(OUTPUT_FORMAT),
});

export type AppearanceData = z.infer<typeof appearanceSchema>;
export type ProfileData = z.infer<typeof profileSchema>;
