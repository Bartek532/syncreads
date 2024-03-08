import {
  Processor,
  Process,
  OnQueueFailed,
  OnQueueActive,
  OnQueueCompleted,
} from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { SyncStatus } from "@rssmarkable/database";
import { Job } from "bull";
import dayjs from "dayjs";

import { SYNC_LOGGER_PROVIDER_TOKEN } from "../../sync/logger/logger.constants";
import { SyncLoggerProviderFactory } from "../../sync/logger/logger.provider";
import { SyncService } from "../../sync/sync.service";

import { ARTICLE_QUEUE_TOKEN } from "./article.constants";
import { ArticleQueueService } from "./article.service";

import type { ArticleQueueJobPayload } from "./types/article.types";

@Processor(ARTICLE_QUEUE_TOKEN)
export class ArticleQueueConsumer {
  constructor(
    private readonly articleQueueService: ArticleQueueService,
    private readonly syncService: SyncService,
    @Inject(SYNC_LOGGER_PROVIDER_TOKEN)
    private readonly syncLogger: SyncLoggerProviderFactory,
  ) {}

  @Process()
  async syncArticle({ data }: Job<ArticleQueueJobPayload>) {
    await this.articleQueueService.syncArticle({
      userId: data.userId,
      url: data.url,
      syncId: data.syncId,
      device: data.device,
    });
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<ArticleQueueJobPayload>, err: Error) {
    await this.syncLogger(job.data.syncId).error(err.message);
    if (err.stack) {
      await this.syncLogger(job.data.syncId).error(`\`\`\`js
${err.stack}`);
    }

    await this.syncService.updateSync(job.data.syncId, {
      finishedAt: dayjs().toISOString(),
      status: SyncStatus.FAILED,
    });
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job<ArticleQueueJobPayload>) {
    await this.syncService.createSyncArticle({
      syncId: job.data.syncId,
      url: job.data.url,
    });

    await this.syncService.updateSync(job.data.syncId, {
      finishedAt: dayjs().toISOString(),
      status: SyncStatus.SUCCESS,
    });

    await this.syncLogger(job.data.syncId).log(`Synchronization finished.`);
  }

  @OnQueueActive()
  async onQueueActive(job: Job<ArticleQueueJobPayload>) {
    await this.syncService.updateSync(job.data.syncId, {
      status: SyncStatus.IN_PROGRESS,
    });

    await this.syncLogger(job.data.syncId).log(
      `Article synchronization started.`,
    );
  }
}
