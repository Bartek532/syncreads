import { env } from "@/lib/env";
import { supabase } from "@/lib/supabase";

import type { Session } from "@syncreads/database";

const getCookie = async (url: string, name: string) => {
  const cookie = await chrome.cookies.get({
    url,
    name,
  });

  if (cookie) {
    return cookie.value;
  }

  let temp = "";
  let i = 0;

  while (true) {
    const cookie = await chrome.cookies.get({
      url,
      name: `${name}.${i}`,
    });

    if (cookie) {
      temp += cookie.value;
    } else {
      return temp;
    }

    i++;
  }
};

export const getSession = async () => {
  try {
    const cookie = await getCookie(
      env.VITE_WEB_APP_URL,
      env.VITE_AUTH_COOKIE_NAME,
    );

    if (!cookie) {
      return null;
    }

    const parsedCookie = JSON.parse(decodeURIComponent(cookie)) as Session;

    if (!parsedCookie) {
      return null;
    }

    const { data } = await supabase.auth.setSession(parsedCookie);
    return data?.session ?? null;
  } catch (e) {
    return null;
  }
};
