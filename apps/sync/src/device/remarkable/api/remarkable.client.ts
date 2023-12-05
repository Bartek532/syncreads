// @ts-expect-error - missing type definitions
import { webcrypto } from "crypto";
import { remarkable } from "rmapi-js";

import type { SupabaseClient } from "@rssmarkable/database";
import type { SubtleCryptoLike } from "rmapi-js";

export const getClient = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase
    .from("Device")
    .select("token")
    .eq("userId", userId)
    .single();

  if (!data || error) {
    throw new Error(`No device found for user ${userId}!`);
  }

  return webcrypto
    ? remarkable(data.token, {
        subtle: (webcrypto as unknown as { subtle: SubtleCryptoLike }).subtle,
      })
    : remarkable(data.token);
};
