import { RemarkableStrategy } from "../remarkable/remarkable.strategy";

import { DEVICE_STRATEGIES_TOKEN, DEVICE_TYPE } from "./device.constants";

import type { DeviceStrategy } from "./device.interface";

export const deviceStrategiesProvider = {
  provide: DEVICE_STRATEGIES_TOKEN,
  useFactory: (
    remarkableStrategy: RemarkableStrategy,
  ): Record<DEVICE_TYPE, DeviceStrategy> => {
    return {
      [DEVICE_TYPE.REMARKABLE]: remarkableStrategy,
    };
  },
  inject: [RemarkableStrategy],
};
