import { Module } from "@nestjs/common";

import { DeviceRemarkableModule } from "../remarkable/remarkable.module";

import { deviceStrategiesProvider } from "./device-strategies.provider";

@Module({
  imports: [DeviceRemarkableModule],
  providers: [deviceStrategiesProvider],
  exports: [deviceStrategiesProvider],
})
export class DeviceModule {}
