import { getSession } from "next-auth/react";

import { prisma } from "../db/client";

import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import type { NextRequest } from "next/server";
import type { Session } from "next-auth";
import type { GetSessionParams } from "next-auth/react";

type CreateNextContextOptions = {
  req: NextRequest;
};

interface CreateContextOptions {
  session: Session | null;
}

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: CreateNextContextOptions | CreateWSSContextFnOptions,
) => {
  const session = await getSession(opts as GetSessionParams);

  return {
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
