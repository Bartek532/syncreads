import { getUserFeeds } from "src/server/services/user.service";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUserFeeds: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(({ input }) => getUserFeeds(input)),
});
