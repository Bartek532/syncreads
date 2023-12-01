import { Module } from "@nestjs/common";

import { supabaseProvider } from "./supabase.provider";

@Module({
  providers: [supabaseProvider],
  exports: [supabaseProvider],
})
export class SupabaseModule {}
