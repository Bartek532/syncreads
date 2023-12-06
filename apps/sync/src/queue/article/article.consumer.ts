import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { SyncStatus } from "@rssmarkable/database";
import { Job } from "bull";
import dayjs from "dayjs";

import { SyncService } from "../../sync/sync.service";

import { ARTICLE_QUEUE_TOKEN } from "./article.constants";
import { ArticleQueueService } from "./article.service";

import type { ArticleQueueJobPayload } from "./types/article.types";

@Processor(ARTICLE_QUEUE_TOKEN)
export class ArticleQueueConsumer {
  constructor(
    private readonly articleQueueService: ArticleQueueService,
    private readonly syncService: SyncService,
  ) {}

  @Process()
  async syncArticle({ data }: Job<ArticleQueueJobPayload>) {
    await this.articleQueueService.syncArticle({
      userId: data.userId,
      url: data.url,
    });

    await this.syncService.updateSync(data.syncId, {
      finishedAt: dayjs().toISOString(),
      status: SyncStatus.SUCCESS,
      syncedArticlesCount: 1,
    });
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<ArticleQueueJobPayload>, err: Error) {
    Logger.error(err);
    await this.syncService.updateSync(job.data.syncId, {
      finishedAt: dayjs().toISOString(),
      status: SyncStatus.FAILED,
    });
  }
}
