import { Module } from "@nestjs/common";

import { ParserModule } from "../parser/parser.module";
import { DeviceRemarkableModule } from "../remarkable/remarkable.module";
import { SupabaseModule } from "../supabase/supabase.module";

import { SyncController } from "./sync.controller";

@Module({
  imports: [SupabaseModule, DeviceRemarkableModule, ParserModule],
  providers: [],
  controllers: [SyncController],
})
export class SyncModule {}
