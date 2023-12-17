import { protectedProcedure, router } from "..";
import { getUserSyncsHandler } from "../../controllers/sync.controller";

export const syncRouter = router({
  getUserSyncs: protectedProcedure.query(({ ctx }) =>
    getUserSyncsHandler({ id: ctx.session.user.id }),
  ),
  // getSyncLog: protectedProcedure
  //   .input(
  //     z.object({
  //       uid: z.string(),
  //     }),
  //   )
  //   .query(({ input: { uid } }) => getSyncLogHandler(uid)),
  // getSyncLogUpdate: protectedProcedure
  //   .input(
  //     z.object({
  //       uid: z.string(),
  //     }),
  //   )
  //   .subscription(({ input: { uid } }) => {
  //     return observable<LogMessage>((emit) => {
  //       void subscriber.subscribe(`sync-${uid}`);
  //       subscriber.on("message", (_, data: string) => {
  //         const json: unknown = JSON.parse(data);
  //         if (isLogMessage(json)) {
  //           emit.next(json);
  //         }
  //       });
  //     });
  //   }),
});
