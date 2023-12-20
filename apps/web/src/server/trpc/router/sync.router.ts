import {
  syncArticlePayloadSchema,
  syncFeedPayloadSchema,
} from "@rssmarkable/shared";

import { protectedProcedure, router } from "..";
import {
  getUserSyncsHandler,
  queueArticleSyncHandler,
  queueFeedSyncHandler,
} from "../../controllers/sync.controller";

export const syncRouter = router({
  getUserSyncs: protectedProcedure.query(({ ctx }) =>
    getUserSyncsHandler({ id: ctx.session.user.id }),
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
