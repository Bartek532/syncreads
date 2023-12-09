import { createServerClient } from "@rssmarkable/database";
import { cookies } from "next/headers";

export const supabase = () => {
  const cookieStore = cookies();

  return createServerClient({
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
};
