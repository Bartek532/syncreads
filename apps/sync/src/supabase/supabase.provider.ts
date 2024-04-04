import {
  type SupabaseClientOptions,
  type SupabaseClient,
  createServiceClient,
} from "@syncreads/database";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "./supabase.constants";

export type SupabaseProviderFactory = (
  options?: SupabaseClientOptions,
) => SupabaseClient;

export const supabaseProvider = {
  provide: SUPABASE_CLIENT_FACTORY_TOKEN,
  useFactory: (): SupabaseProviderFactory => {
    return (options) => createServiceClient(options);
  },
};
