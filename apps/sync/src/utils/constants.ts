import { DeviceType } from "@syncreads/database";

export const DEVICE_CLOUD_LABEL: Record<DeviceType, string> = {
  [DeviceType.KINDLE]: "Amazon",
  [DeviceType.REMARKABLE]: "reMarkable",
};
