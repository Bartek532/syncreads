import type { Feed, UserFeed } from "@rssmarkable/database";

export type FeedQueueJobPayload = {
  userId: string;
  feed: Pick<Feed, "id" | "url"> &
    Pick<UserFeed, "lastSyncDate" | "startArticlesCount">;
  syncId: string;
  last: boolean;
};
