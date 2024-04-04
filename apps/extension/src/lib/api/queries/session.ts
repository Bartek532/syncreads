import { env } from "@/lib/env";
import { supabase } from "@/lib/supabase";

import type { Session } from "@syncreads/database";

export const getSession = async () => {
  try {
    const cookie = await chrome.cookies.get({
      url: env.VITE_WEB_APP_URL,
      name: env.VITE_AUTH_COOKIE_NAME,
    });

    if (!cookie?.value) {
      return null;
    }

    const parsedCookie = JSON.parse(
      decodeURIComponent(cookie.value),
    ) as Session;

    if (!parsedCookie) {
      return null;
    }

    const { data } = await supabase.auth.setSession(parsedCookie);
    return data?.session ?? null;
  } catch (e) {
    return null;
  }
};
