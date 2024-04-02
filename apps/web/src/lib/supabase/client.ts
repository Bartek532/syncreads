import { createBrowserClient } from "@syncreads/database";

import type { SupabaseClient } from "@syncreads/database";

let client: SupabaseClient | null = null;

export const supabase = () => {
  if (!client) {
    client = createBrowserClient();
  }

  return client;
};
