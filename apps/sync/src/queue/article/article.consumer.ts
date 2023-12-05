import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";

import { ARTICLE_QUEUE_TOKEN } from "./article.constants";

import type { ArticleQueueJobPayload } from "./types/article.types";

@Processor(ARTICLE_QUEUE_TOKEN)
export class ArticleQueueConsumer {
  @Process()
  syncArticle({ data }: Job<ArticleQueueJobPayload>) {
    console.log(data);
  }
}
