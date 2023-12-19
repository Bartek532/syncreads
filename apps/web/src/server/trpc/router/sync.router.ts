import { syncArticlePayloadSchema } from "@rssmarkable/shared";

import { protectedProcedure, router } from "..";
import {
  getUserSyncsHandler,
  queueArticleSyncHandler,
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
});
