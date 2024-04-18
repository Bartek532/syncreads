import { createTRPCRouter } from "..";

import { feedRouter } from "./feed.router";
import { syncRouter } from "./sync.router";
import { userRouter } from "./user.router";

export const appRouter = createTRPCRouter({
  feed: feedRouter,
  user: userRouter,
  sync: syncRouter,
});

export type AppRouter = typeof appRouter;
