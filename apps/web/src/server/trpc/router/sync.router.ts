import {
  syncArticlePayloadSchema,
  syncFeedPayloadSchema,
} from "@rssmarkable/shared";

import { protectedProcedure, router } from "..";
import {
  queueArticleSyncHandler,
  queueFeedSyncHandler,
} from "../../controllers/sync.controller";

export const syncRouter = router({
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
