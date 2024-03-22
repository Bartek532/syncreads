import type { DeviceType } from "@rssmarkable/database";
import type { SyncOptionsPayload } from "@rssmarkable/shared";

export type FeedQueueJobPayload = {
  userId: string;
  feedId: string;
  syncId: string;
  device: DeviceType;
  options: SyncOptionsPayload;
  last: boolean;
};
