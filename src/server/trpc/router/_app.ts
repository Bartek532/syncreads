import { router } from "../trpc";

import { authRouter } from "./auth";
import { feedRouter } from "./feed.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  auth: authRouter,
  feed: feedRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
