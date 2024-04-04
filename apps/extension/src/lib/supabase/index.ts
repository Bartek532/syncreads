/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createExtensionClient } from "@syncreads/database";

const env = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

export const supabase = createExtensionClient(env);
