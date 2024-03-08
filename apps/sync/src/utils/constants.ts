import { DeviceType } from "@rssmarkable/database";

export const DEVICE_CLOUD_LABEL: Record<DeviceType, string> = {
  [DeviceType.KINDLE]: "Amazon",
  [DeviceType.REMARKABLE]: "reMarkable",
};
