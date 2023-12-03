import { Module } from "@nestjs/common";

import { DeviceRemarkableModule } from "./remarkable/remarkable.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { SyncModule } from "./sync/sync.module";

@Module({
  imports: [SupabaseModule, DeviceRemarkableModule, SyncModule],
})
export class AppModule {}
