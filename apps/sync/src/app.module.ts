import { Module } from "@nestjs/common";

import { SupabaseModule } from "./supabase/supabase.module";
import { SyncModule } from "./sync/sync.module";

@Module({
  imports: [SupabaseModule, SyncModule],
})
export class AppModule {}
