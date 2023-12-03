import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../supabase/supabase.constants";

import { getClient } from "./api/remarkable.client";
import { REMARKABLE_CLIENT_FACTORY_TOKEN } from "./remarkable.constants";

import type { SupabaseProviderFactory } from "../supabase/supabase.provider";
import type { RemarkableApi } from "rmapi-js";

export type RemarkableProviderFactory = (
  userId: string,
) => Promise<RemarkableApi>;

export const remarkableProvider = {
  provide: REMARKABLE_CLIENT_FACTORY_TOKEN,
  useFactory: (supabase: SupabaseProviderFactory) => {
    return (userId: string) => getClient(supabase(), userId);
  },
  inject: [SUPABASE_CLIENT_FACTORY_TOKEN],
};
