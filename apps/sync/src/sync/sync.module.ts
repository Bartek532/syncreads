import { Module } from "@nestjs/common";

import { UserModule } from "../auth/user/user.module";
import { DeviceModule } from "../device/device.module";
import { ParserModule } from "../parser/parser.module";
import { SupabaseModule } from "../supabase/supabase.module";

import { SyncController } from "./sync.controller";
import { SyncService } from "./sync.service";

@Module({
  imports: [SupabaseModule, ParserModule, DeviceModule, UserModule],
  providers: [SyncService],
  controllers: [SyncController],
  exports: [SyncService],
})
export class SyncModule {}
