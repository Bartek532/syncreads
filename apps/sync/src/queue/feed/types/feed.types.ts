import type { DeviceType } from "@rssmarkable/database";

export type FeedQueueJobPayload = {
  userId: string;
  feedId: string;
  syncId: string;
  device: DeviceType;
  last: boolean;
};
