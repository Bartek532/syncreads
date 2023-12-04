import { Module } from "@nestjs/common";

import { deviceStrategiesProvider } from "../device/device-strategies.provider";
import { DeviceRemarkableModule } from "../remarkable/remarkable.module";
import { SupabaseModule } from "../supabase/supabase.module";

import { SyncController } from "./sync.controller";

@Module({
  imports: [SupabaseModule, DeviceRemarkableModule],
  providers: [deviceStrategiesProvider],
  controllers: [SyncController],
})
export class SyncModule {}
