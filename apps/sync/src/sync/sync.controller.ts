import { Controller, Get, Inject } from "@nestjs/common";

import { DeviceStrategiesProviderFactory } from "../device/device-strategies.provider";
import { DEVICE_STRATEGIES_TOKEN } from "../device/device.constants";

@Controller()
export class SyncController {
  constructor(
    @Inject(DEVICE_STRATEGIES_TOKEN)
    private readonly deviceStrategies: DeviceStrategiesProviderFactory,
  ) {}

  @Get()
  async getHello() {
    return this.deviceStrategies.remarkable.getFiles(
      "cb97431a-cb90-4a23-aa5f-04af7752c5f9",
    );
  }
}
