import { observable } from "@trpc/server/observable";
import { z } from "zod";

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

  addTestEvent: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    ctx.ee.emit("add", input);
  }),
  getTestEvent: publicProcedure.subscription(({ ctx }) => {
    return observable<string>((emit) => {
      const onAdd = (data: string) => {
        emit.next(data);
      };
      ctx.ee.on("add", onAdd);

      return () => {
        ctx.ee.off("add", onAdd);
      };
    });
  }),
});
