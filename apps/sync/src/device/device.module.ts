import { Module } from "@nestjs/common";

import { deviceStrategiesProvider } from "./device-strategies.provider";
import { DeviceKindleModule } from "./kindle/kindle.module";
import { DeviceRemarkableModule } from "./remarkable/remarkable.module";

@Module({
  imports: [DeviceRemarkableModule, DeviceKindleModule],
  providers: [deviceStrategiesProvider],
  exports: [deviceStrategiesProvider],
})
export class DeviceModule {}
