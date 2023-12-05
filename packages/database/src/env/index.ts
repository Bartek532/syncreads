import { databaseSchema, validateConfig } from "@rssmarkable/shared";

const _env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export const env = validateConfig(databaseSchema, _env);
