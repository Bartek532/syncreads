import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { subscriber } from "../../../lib/redis";
import { offsetPaginationSchema } from "../../../utils/validation";
import {
  getSyncLogHandler,
  getUserSyncsHandler,
} from "../../controllers/sync.controller";
import { protectedProcedure, router } from "../trpc";

import type { LogMessage } from "../../../../types/log.types";

export const syncRouter = router({
  getUserSyncs: protectedProcedure
    .input(offsetPaginationSchema)
    .query(({ ctx, input }) =>
      getUserSyncsHandler({ id: ctx.session.user.id, ...input }),
    ),
  getSyncLog: protectedProcedure
    .input(
      z.object({
        uid: z.string(),
      }),
    )
    .query(({ input: { uid } }) => getSyncLogHandler(uid)),
  getSyncLogUpdate: protectedProcedure
    .input(
      z.object({
        uid: z.string(),
      }),
    )
    .subscription(({ input: { uid } }) => {
      return observable<LogMessage>((emit) => {
        void subscriber.subscribe(`sync-${uid}`);
        subscriber.on("message", (_, data: string) => {
          emit.next(JSON.parse(data) as LogMessage); // TODO: add zod validation to avoid casting
        });
      });
    }),
});
