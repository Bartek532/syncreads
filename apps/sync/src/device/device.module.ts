import { Module } from "@nestjs/common";

import { deviceStrategiesProvider } from "./device-strategies.provider";
import { DeviceRemarkableModule } from "./remarkable/remarkable.module";

@Module({
  imports: [DeviceRemarkableModule],
  providers: [deviceStrategiesProvider],
  exports: [deviceStrategiesProvider],
})
export class DeviceModule {}
