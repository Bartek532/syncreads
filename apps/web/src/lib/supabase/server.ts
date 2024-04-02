import { createServerClient } from "@syncreads/database";
import { cookies } from "next/headers";

import type { SupabaseClient } from "@syncreads/database";

let client: SupabaseClient | null = null;

export const supabase = () => {
  if (client) {
    return client;
  }

  const cookieStore = cookies();

  client = createServerClient({
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  return client;
};
