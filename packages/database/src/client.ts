import {
  createBrowserClient as createBrowserSupabaseClient,
  createServerClient as createServerSupabaseClient,
} from "@supabase/ssr";
import {
  createClient,
  type SupabaseClientOptions as SupabaseClientOptionsType,
  type SupabaseClient as SupabaseClientType,
} from "@supabase/supabase-js";
import {
  anonDatabaseSchema,
  clientDatabaseSchema,
  serviceDatabaseSchema,
  validateConfig,
} from "@syncreads/shared";

import { anonEnv, serviceEnv } from "./env";

import type { Database } from "./types/generated/schema";
import type { CookieMethods, CookieOptionsWithName } from "@supabase/ssr";

export type SupabaseClientOptions = SupabaseClientOptionsType<"public"> & {
  cookies: CookieMethods;
  cookieOptions?: CookieOptionsWithName;
  isSingleton?: boolean;
};

export type SupabaseClient = SupabaseClientType<Database, "public">;

export const createBrowserClient = (
  options?: SupabaseClientOptions,
): SupabaseClient => {
  const env = validateConfig(anonDatabaseSchema, anonEnv);

  return createBrowserSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );
};

export const createServerClient = (
  options: SupabaseClientOptions,
): SupabaseClient => {
  const env = validateConfig(anonDatabaseSchema, anonEnv);

  return createServerSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );
};

export const createServiceClient = (
  options?: SupabaseClientOptions,
): SupabaseClient => {
  const env = validateConfig(serviceDatabaseSchema, serviceEnv);

  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, options);
};

export const createExtensionClient = (
  extensionEnv: Record<string, string>, // need to pass it as an argument because Vite reads env variables from import.meta.env
  options?: SupabaseClientOptions,
): SupabaseClient => {
  const env = validateConfig(clientDatabaseSchema, extensionEnv);

  return createClient(
    env.VITE_SUPABASE_URL,
    env.VITE_SUPABASE_ANON_KEY,
    options,
  );
};

export type { CookieOptions } from "@supabase/ssr";
