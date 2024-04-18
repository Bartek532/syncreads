import { createTRPCRouter, protectedProcedure } from "..";
import {
  cursorPaginationSchema,
  deleteFeedsSchema,
  limitSchema,
  rangeSchema,
  saveDeviceSchema,
  updateUserSchema,
} from "../../../utils/validation/schema";
import {
  deleteUserFeedsHandler,
  getUserDeviceHandler,
  getUserFeedsHandler,
  getUserArticlesHandler,
  getUserSyncsHandler,
  registerDeviceHandler,
  unregisterDeviceHandler,
  updateUserHandler,
} from "../../controllers/user.controller";

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ input }) => updateUserHandler(input)),
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
    .input(saveDeviceSchema)
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
  getUserArticles: protectedProcedure
    .input(limitSchema)
    .query(({ ctx, input }) =>
      getUserArticlesHandler({ id: ctx.session.user.id, ...input }),
    ),
});
