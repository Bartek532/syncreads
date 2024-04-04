import type { DeviceType } from "@syncreads/database";
import type { SyncOptionsPayload } from "@syncreads/shared";

export type FeedQueueJobPayload = {
  userId: string;
  feedId: string;
  syncId: string;
  device: DeviceType;
  options: SyncOptionsPayload;
  last: boolean;
};
