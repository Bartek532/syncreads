import {
  createBrowserClient as createBrowserSupabaseClient,
  createServerClient as createServerSupabaseClient,
} from "@supabase/ssr";
import { type SupabaseClient } from "@supabase/supabase-js";

import { env } from "./env";

import type { Database } from "./types/generated/schema";
import type { CookieMethods } from "@supabase/ssr";

export const createBrowserClient = (options?: {
  cookies: CookieMethods;
}): SupabaseClient<Database, "public"> =>
  createBrowserSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );

export const createServerClient = (options: {
  cookies: CookieMethods;
}): SupabaseClient<Database, "public"> =>
  createServerSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );

export type { CookieOptions } from "@supabase/ssr";
