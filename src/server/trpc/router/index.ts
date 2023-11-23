import { router } from "..";

import { authRouter } from "./auth.router";
import { feedRouter } from "./feed.router";
import { syncRouter } from "./sync.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  auth: authRouter,
  feed: feedRouter,
  user: userRouter,
  sync: syncRouter,
});

export type AppRouter = typeof appRouter;
