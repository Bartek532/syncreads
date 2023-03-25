import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { redis } from "../../../lib/redis";
import {
  getSyncLogHandler,
  getUserSyncsHandler,
} from "../../controllers/sync.controller";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const syncRouter = router({
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
  getSyncLog: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input }) => getSyncLogHandler(input.id)),

  addTestEvent: publicProcedure.input(z.string()).mutation(async () => {
    await redis.publish("test", "test message");
  }),
  getTestEvent: publicProcedure.subscription(() => {
    return observable<string>((emit) => {
      redis.on("message", (channel: string, message: string) => {
        console.log(channel, message);
        console.log(`Subscribed to ${message} channels.`);
        emit.next(message);
      });
    });
  }),
});
