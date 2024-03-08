import type { DeviceType } from "@rssmarkable/database";

export type ArticleQueueJobPayload = {
  userId: string;
  url: string;
  syncId: string;
  device: DeviceType;
};
