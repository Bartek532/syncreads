import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { FEED_QUEUE_TOKEN } from "./feed.constants";

@Module({
  imports: [
    BullModule.registerQueue({
      name: FEED_QUEUE_TOKEN,
    }),
  ],
})
export class FeedQueueModule {}
