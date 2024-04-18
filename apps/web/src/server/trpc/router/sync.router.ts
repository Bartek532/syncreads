import {
  clearUrl,
  syncArticlePayloadSchema,
  syncFeedPayloadSchema,
} from "@syncreads/shared";

import { getSyncLogSchema, getSyncSchema } from "@/utils";

import { protectedProcedure, createTRPCRouter } from "..";
import {
  getSyncHandler,
  getSyncLogHandler,
  queueArticleSyncHandler,
  queueFeedSyncHandler,
} from "../../controllers/sync.controller";

export const syncRouter = createTRPCRouter({
  queueArticleSync: protectedProcedure
    .input(syncArticlePayloadSchema)
    .mutation(({ ctx, input }) =>
      queueArticleSyncHandler({
        ...input,
        id: ctx.session.user.id,
        url: clearUrl(input.url),
      }),
    ),
  queueFeedSync: protectedProcedure
    .input(syncFeedPayloadSchema)
    .mutation(({ ctx, input }) =>
      queueFeedSyncHandler({
        ...input,
        id: ctx.session.user.id,
      }),
    ),
  getSync: protectedProcedure
    .input(getSyncSchema)
    .query(({ input }) => getSyncHandler(input)),
  getSyncLog: protectedProcedure
    .input(getSyncLogSchema)
    .query(({ input }) => getSyncLogHandler(input)),
});
