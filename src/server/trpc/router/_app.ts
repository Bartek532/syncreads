import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { feedRouter } from "./feed.router";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  feed: feedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
