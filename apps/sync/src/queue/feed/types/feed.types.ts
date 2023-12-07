export type FeedQueueJobPayload = {
  userId: string;
  feedId: string;
  syncId: string;
  last: boolean;
};
