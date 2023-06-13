import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "unknown"}: ${error.message}`,
          );
        }
      : ({ error }) => console.error(error),
});
