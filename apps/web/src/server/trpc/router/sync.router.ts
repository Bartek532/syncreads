import {
  syncArticlePayloadSchema,
  syncFeedPayloadSchema,
} from "@rssmarkable/shared";

import { getSyncsSchema, rangeSchema } from "@/utils";

import { protectedProcedure, router } from "..";
import {
  getUserSyncsHandler,
  queueArticleSyncHandler,
  queueFeedSyncHandler,
} from "../../controllers/sync.controller";

export const syncRouter = router({
  getUserSyncs: protectedProcedure
    .input(getSyncsSchema)
    .query(({ ctx, input }) =>
      getUserSyncsHandler({ id: ctx.session.user.id, ...input }),
    ),
  queueArticleSync: protectedProcedure
    .input(syncArticlePayloadSchema)
    .mutation(({ ctx, input }) =>
      queueArticleSyncHandler({ id: ctx.session.user.id, ...input }),
    ),
  queueFeedSync: protectedProcedure
    .input(syncFeedPayloadSchema)
    .mutation(({ ctx, input }) =>
      queueFeedSyncHandler({ id: ctx.session.user.id, ...input }),
    ),
});
