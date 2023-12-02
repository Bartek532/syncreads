import { Module } from "@nestjs/common";

import { SupabaseModule } from "../supabase/supabase.module";

import { SyncController } from "./sync.controller";

@Module({
  imports: [SupabaseModule],
  controllers: [SyncController],
})
export class SyncModule {}
