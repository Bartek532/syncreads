import {
  createBrowserClient as createBrowserSupabaseClient,
  createServerClient as createServerSupabaseClient,
} from "@supabase/ssr";

import { env } from "./env";

import type { Database } from "./types/generated/schema";
import type { CookieMethods, CookieOptionsWithName } from "@supabase/ssr";
import type {
  SupabaseClientOptions as SupabaseClientOptionsType,
  SupabaseClient as SupabaseClientType,
} from "@supabase/supabase-js";

export type SupabaseClientOptions = SupabaseClientOptionsType<"public"> & {
  cookies: CookieMethods;
  cookieOptions?: CookieOptionsWithName;
  isSingleton?: boolean;
};

export type SupabaseClient = SupabaseClientType<Database, "public">;

export const createBrowserClient = (
  options?: SupabaseClientOptions,
): SupabaseClient =>
  createBrowserSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );

export const createServerClient = (
  options: SupabaseClientOptions,
): SupabaseClient =>
  createServerSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );

export type { CookieOptions } from "@supabase/ssr";
