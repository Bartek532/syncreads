import type { DeviceType } from "@syncreads/database";
import type { SyncOptionsPayload } from "@syncreads/shared";

export type ArticleQueueJobPayload = {
  userId: string;
  syncId: string;
  url: string;
  device: DeviceType;
  options: SyncOptionsPayload;
};
