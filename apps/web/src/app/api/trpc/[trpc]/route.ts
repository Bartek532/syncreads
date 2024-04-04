import { NODE_ENV } from "@syncreads/shared";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { env } from "@/lib/env/server";
import { createTRPCContext } from "@/server/trpc";
import { appRouter } from "@/server/trpc/router";

import type { NextRequest } from "next/server";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === NODE_ENV.DEVELOPMENT
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : ({ error }) => console.error(error),
  });

export { handler as GET, handler as POST };
