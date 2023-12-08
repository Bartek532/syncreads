import { createServerClient } from "@rssmarkable/database";
import { cookies } from "next/headers";

export const supabase = createServerClient({
  cookies: {
    get(name: string) {
      return cookies().get(name)?.value;
    },
  },
});
