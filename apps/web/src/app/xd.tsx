"use client";

import { useEffect } from "react";

import { supabase } from "@/lib/supabase/client";

export const XD = () => {
  useEffect(() => {
    const { data } = supabase().auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      void chrome.runtime.sendMessage("hhhkgjfilbkopomhccklkjnapeoepeei", {
        event,
        session,
      });
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return null;
};
