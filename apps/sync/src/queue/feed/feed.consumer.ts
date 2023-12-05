import { Process, Processor } from "@nestjs/bull";

import {
  FEED_QUEUE_TOKEN,
  SYNC_FEEDS_JOB_NAME,
  SYNC_FEED_JOB_NAME,
} from "./feed.constants";

@Processor(FEED_QUEUE_TOKEN)
export class FeedQueueConsumer {
  @Process(SYNC_FEED_JOB_NAME)
  syncFeed() {
    console.log("syncFeed");
  }

  @Process(SYNC_FEEDS_JOB_NAME)
  syncFeeds() {
    console.log("syncFeeds");
  }
}
