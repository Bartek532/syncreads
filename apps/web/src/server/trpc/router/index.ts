import { router } from "..";

import { syncRouter } from "./sync.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  // auth: authRouter,
  // feed: feedRouter,
  user: userRouter,
  sync: syncRouter,
});

export type AppRouter = typeof appRouter;
