import { router, protectedProcedure } from "..";
import {
  cursorPaginationSchema,
  deleteFeedsSchema,
  rangeSchema,
  registerDeviceSchema,
} from "../../../utils/validation/schema";
import {
  deleteUserFeedsHandler,
  getUserDeviceHandler,
  getUserFeedsHandler,
  getUserSyncedArticlesHandler,
  getUserSyncsHandler,
  registerDeviceHandler,
  unregisterDeviceHandler,
} from "../../controllers/user.controller";

export const userRouter = router({
  getUserFeeds: protectedProcedure
    .input(cursorPaginationSchema)
    .query(({ ctx, input }) =>
      getUserFeedsHandler({ id: ctx.session.user.id, input }),
    ),
  deleteUserFeeds: protectedProcedure
    .input(deleteFeedsSchema)
    .mutation(({ input, ctx }) =>
      deleteUserFeedsHandler({ id: ctx.session.user.id, ...input }),
    ),
  getUserDevice: protectedProcedure.query(({ ctx }) =>
    getUserDeviceHandler({ id: ctx.session.user.id }),
  ),
  registerDevice: protectedProcedure
    .input(registerDeviceSchema)
    .mutation(({ input, ctx }) =>
      registerDeviceHandler({ ...input, id: ctx.session.user.id }),
    ),
  unregisterDevice: protectedProcedure.mutation(({ ctx }) =>
    unregisterDeviceHandler({ id: ctx.session.user.id }),
  ),
  getUserSyncs: protectedProcedure
    .input(rangeSchema)
    .query(({ ctx, input }) =>
      getUserSyncsHandler({ id: ctx.session.user.id, ...input }),
    ),
  getUserSyncedArticles: protectedProcedure.query(({ ctx }) =>
    getUserSyncedArticlesHandler({ id: ctx.session.user.id }),
  ),
});
