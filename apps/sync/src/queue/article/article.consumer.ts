import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";

import {
  ARTICLE_QUEUE_TOKEN,
  SYNC_ARTICLE_JOB_NAME,
} from "./article.constants";

import type { ArticleQueueJobPayload } from "./types/article.types";

@Processor(ARTICLE_QUEUE_TOKEN)
export class ArticleQueueConsumer {
  @Process(SYNC_ARTICLE_JOB_NAME)
  syncArticle({ data }: Job<ArticleQueueJobPayload>) {
    console.log(data);
  }
}
