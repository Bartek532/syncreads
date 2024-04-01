import { env } from "@/lib/env";
import { supabase } from "@/lib/supabase";

import type { Session } from "@rssmarkable/database";

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();

  const cookie = await chrome.cookies.get({
    // TODO: Change this to the production URL
    url: "",
    name: env.VITE_AUTH_COOKIE_NAME,
  });

  if (!cookie?.value || !data.session) {
    return null;
  }

  try {
    const parsedCookie = JSON.parse(
      decodeURIComponent(cookie.value),
    ) as Session;

    if (!parsedCookie) {
      return null;
    }

    const { data } = await supabase.auth.setSession(parsedCookie);
    return data?.session ?? null;
  } catch {
    return null;
  }
};
