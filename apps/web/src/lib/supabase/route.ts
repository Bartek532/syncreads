/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createServerClient } from "@rssmarkable/database";
import { cookies } from "next/headers";

import type { CookieOptions } from "@rssmarkable/database";

export const supabase = () => {
  const cookieStore = cookies();

  return createServerClient({
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });
};
