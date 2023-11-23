import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { protectedProcedure, router } from "..";
import { subscriber } from "../../../lib/redis";
import { offsetPaginationSchema } from "../../../utils/validation/schema";
import { isLogMessage } from "../../../utils/validation/validator";
import {
  getSyncLogHandler,
  getUserSyncsHandler,
} from "../../controllers/sync.controller";

import type { LogMessage } from "../../../utils/validation/types";

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
          const json: unknown = JSON.parse(data);
          if (isLogMessage(json)) {
            emit.next(json);
          }
        });
      });
    }),
});
