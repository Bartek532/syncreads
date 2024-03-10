import type { DeviceType } from "@rssmarkable/database";
import type { SyncOptionsPayload } from "@rssmarkable/shared";

export type ArticleQueueJobPayload = {
  userId: string;
  syncId: string;
  url: string;
  device: DeviceType;
  options: SyncOptionsPayload;
};
