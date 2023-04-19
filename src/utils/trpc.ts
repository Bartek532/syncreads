import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
} from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import type { AppRouter } from "../server/trpc/router/_app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  } // browser should use relative url
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  } // SSR should use vercel url

  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const getEndingLink = () => {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    });
  }

  const client = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:3000",
  });

  return wsLink<AppRouter>({
    client,
  });
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(),
      ],
    };
  },
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
