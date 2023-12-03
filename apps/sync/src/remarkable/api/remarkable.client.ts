import { remarkable } from "rmapi-js";

import type { SupabaseClient } from "@rssmarkable/database";

export const getClient = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase
    .from("Device")
    .select("token")
    .eq("userId", userId)
    .single();

  if (!data || error) {
    throw new Error(`No device found for user ${userId}!`);
  }

  return remarkable(data.token);
};
