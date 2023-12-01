import {
  type SupabaseClientOptions,
  type SupabaseClient,
  createBrowserClient,
} from "@rssmarkable/database";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "./supabase.constants";

export type SupabaseProviderFactory = (
  options?: SupabaseClientOptions,
) => SupabaseClient;

export const supabaseProvider = {
  provide: SUPABASE_CLIENT_FACTORY_TOKEN,
  useFactory: (): SupabaseProviderFactory => {
    return (options) => createBrowserClient(options);
  },
};
