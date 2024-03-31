import { supabase } from "@/lib/supabase";

import type { Session } from "@rssmarkable/database";

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    return data.session;
  }

  const cookie = await chrome.cookies.get({
    // TODO: Change this to the production URL
    url: "http://localhost",
    name: "sb-127-auth-token",
  });

  if (!cookie?.value) {
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
