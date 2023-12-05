import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { ARTICLE_QUEUE_TOKEN } from "./article.constants";

@Module({
  imports: [
    BullModule.registerQueue({
      name: ARTICLE_QUEUE_TOKEN,
    }),
  ],
})
export class ArticleQueueModule {}
