import { HTTP_STATUS_CODE } from "@rssmarkable/shared";
import { z } from "zod";

const isHttpStatus = (status: number): status is HTTP_STATUS_CODE =>
  Object.values<number>(HTTP_STATUS_CODE).includes(status);

const syncApiErrorResponseSchema = z.object({
  error: z.object({
    timestamp: z.string(),
    path: z.string(),
    status: z.number(),
    message: z.string(),
  }),
});

export const isSyncApiErrorResponse = (
  data: unknown,
): data is z.infer<typeof syncApiErrorResponseSchema> =>
  syncApiErrorResponseSchema.safeParse(data).success;

export class ApiError extends Error {
  status: HTTP_STATUS_CODE;
  constructor(status: number, message: string) {
    super(message);
    this.status = isHttpStatus(status)
      ? status
      : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
}
