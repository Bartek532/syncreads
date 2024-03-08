import { DeviceType } from "@rssmarkable/database";

import { DEVICE_STRATEGIES_TOKEN } from "./device.constants";
import { KindleStrategy } from "./kindle/kindle.strategy";
import { RemarkableStrategy } from "./remarkable/remarkable.strategy";

import type { DeviceStrategy } from "./device.interface";

export type DeviceStrategiesProviderFactory = Record<
  DeviceType,
  DeviceStrategy
>;

export const deviceStrategiesProvider = {
  provide: DEVICE_STRATEGIES_TOKEN,
  useFactory: (
    remarkableStrategy: RemarkableStrategy,
    kindleStrategy: KindleStrategy,
  ): Record<DeviceType, DeviceStrategy> => {
    return {
      [DeviceType.REMARKABLE]: remarkableStrategy,
      [DeviceType.KINDLE]: kindleStrategy,
    };
  },
  inject: [RemarkableStrategy, KindleStrategy],
};
