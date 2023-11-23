import { z } from "zod";

import { router, protectedProcedure } from "..";
import {
  getUserDeviceHandler,
  registerDeviceHandler,
  syncUserFeedsHandler,
  unregisterDeviceHandler,
} from "../../../server/controllers/user.controller";
import { getUserFeeds } from "../../../server/services/user.service";
import { registerDeviceSchema } from "../../../utils/validation/schema";

export const userRouter = router({
  getUserFeeds: protectedProcedure.query(({ ctx }) =>
    getUserFeeds({ id: ctx.session.user.id }),
  ),
  registerDevice: protectedProcedure
    .input(registerDeviceSchema)
    .mutation(({ input, ctx }) =>
      registerDeviceHandler({ ...input, id: ctx.session.user.id }),
    ),
  unregisterDevice: protectedProcedure.mutation(({ ctx }) =>
    unregisterDeviceHandler({ id: ctx.session.user.id }),
  ),
  getUserDevice: protectedProcedure.query(({ ctx }) =>
    getUserDeviceHandler({ id: ctx.session.user.id }),
  ),
  syncUserFeeds: protectedProcedure
    .input(
      z
        .object({
          feeds: z.array(
            z.object({
              url: z.string().url(),
            }),
          ),
        })
        .optional(),
    )
    .mutation(({ ctx, input }) =>
      syncUserFeedsHandler({ id: ctx.session.user.id, feeds: input?.feeds }),
    ),
});
