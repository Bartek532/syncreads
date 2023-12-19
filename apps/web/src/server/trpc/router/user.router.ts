import { router, protectedProcedure } from "..";
import {
  cursorPaginationSchema,
  registerDeviceSchema,
} from "../../../utils/validation/schema";
import {
  getUserDeviceHandler,
  getUserFeedsHandler,
  registerDeviceHandler,
  unregisterDeviceHandler,
} from "../../controllers/user.controller";

export const userRouter = router({
  getUserFeeds: protectedProcedure
    .input(cursorPaginationSchema)
    .query(({ ctx, input }) =>
      getUserFeedsHandler({ id: ctx.session.user.id, input }),
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
});
