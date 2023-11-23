import { router, publicProcedure } from "..";
import { registerUserSchema } from "../../../utils/validation/schema";
import { registerUserHandler } from "../../controllers/user.controller";

export const authRouter = router({
  register: publicProcedure
    .input(registerUserSchema)
    .mutation(({ input }) => registerUserHandler({ input })),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});
