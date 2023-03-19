import EventEmitter from "events";
import { getSession } from "next-auth/react";

import { prisma } from "../db/client";

import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/dist/adapters/node-http";
import type { IncomingMessage } from "http";
import type { Session } from "next-auth";
import type ws from "ws";

interface CreateContextOptions {
  session: Session | null;
  ee: EventEmitter;
}

const ee = new EventEmitter();

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    ee: opts.ee,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts:
    | CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>,
) => {
  const session = await getSession(opts);

  // Get the session from the server using the unstable_getServerSession wrapper function
  //const session = await getServerAuthSession({ req, res });

  return createContextInner({
    session,
    ee,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
