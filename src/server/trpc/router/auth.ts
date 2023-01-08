import { registerUserHandler } from "../../../server/controllers/user.controller";
import { registerUserSchema } from "../../../utils/validation";
import { router, publicProcedure } from "../trpc";

export const authRouter = router({
  register: publicProcedure
    .input(registerUserSchema)
    .mutation(({ input }) => registerUserHandler({ input })),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});
