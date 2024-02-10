import { ZodIssueCode, z } from "zod";

export const addFeedSchema = z
  .object({
    url: z
      .union([
        z
          .string({ required_error: "Url is required." })
          .min(1, "Url is required.")
          .url("Url must be a valid url."),
        z.literal(""),
      ])
      .optional(),
    file: z
      .instanceof(File, { message: "File is required." })
      .refine((file) => file.size <= 200000, `Max file size is 2MB.`)
      .refine((file) => {
        const extension = file?.name.split(".").pop();
        return (
          ["opml"].includes(file.type) ||
          (extension && ["opml"].includes(extension))
        );
      }, "Only .opml files are accepted.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    const message = "Either url or file is required to add feeds.";

    if (!data.file && !data.url) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message,
        path: ["url"],
      });

      ctx.addIssue({
        code: ZodIssueCode.custom,
        message,
        path: ["file"],
      });
    }
  });

export type AddFeedInput = z.infer<typeof addFeedSchema>;
