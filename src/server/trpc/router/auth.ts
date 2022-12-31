import { registerUserHandler } from "src/server/controllers/user.controller";
import { registerUserSchema } from "src/utils/validation";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  register: publicProcedure
    .input(registerUserSchema)
    .mutation(({ input }) => registerUserHandler({ input })),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
