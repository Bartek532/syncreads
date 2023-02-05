import { z } from "zod";

import {
  getUserDeviceHandler,
  getUserSyncsHandler,
  registerDeviceHandler,
  syncUserFeedsHandler,
  unregisterDeviceHandler,
} from "../../../server/controllers/user.controller";
import { getUserFeeds } from "../../../server/services/user.service";
import { registerDeviceSchema } from "../../../utils/validation";
import { router, protectedProcedure } from "../trpc";

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
  getUserSyncs: protectedProcedure
    .input(
      z.object({
        perPage: z.number().min(1).max(100).nullish(),
        page: z.number().nullish(),
      }),
    )
    .query(({ ctx, input }) =>
      getUserSyncsHandler({ id: ctx.session.user.id, ...input }),
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
