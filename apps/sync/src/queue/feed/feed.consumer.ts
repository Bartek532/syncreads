import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { SyncStatus } from "@rssmarkable/database";
import { Job } from "bull";
import dayjs from "dayjs";

import { ParserService } from "../../parser/parser.service";
import { SyncService } from "../../sync/sync.service";

import { FEED_QUEUE_TOKEN } from "./feed.constants";
import { FeedQueueService } from "./feed.service";

import type { FeedQueueJobPayload } from "./types/feed.types";

@Processor(FEED_QUEUE_TOKEN)
export class FeedQueueConsumer {
  constructor(
    private readonly parserService: ParserService,
    private readonly syncService: SyncService,
    private readonly feedQueueService: FeedQueueService,
  ) {}

  @Process()
  async syncFeed({ data }: Job<FeedQueueJobPayload>) {
    let articlesCount = 0;
    const items = await this.parserService.parseFeed(data.feed.url);
    const articles = items.filter(({ pubDate }, index) =>
      data.feed.lastSyncDate
        ? dayjs(pubDate).isAfter(data.feed.lastSyncDate)
        : index < data.feed.startArticlesCount,
    );

    for (const article of articles) {
      await this.feedQueueService.syncArticle({
        userId: data.userId,
        url: article.link,
      });
      articlesCount++;
    }

    await this.syncService.updateSync(data.syncId, {
      syncedArticlesCount: articlesCount,
    });
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<FeedQueueJobPayload>, err: Error) {
    Logger.error(err);
    await this.syncService.updateSync(job.data.syncId, {
      finishedAt: dayjs().toISOString(),
      status: SyncStatus.FAILED,
    });
  }

  @OnQueueCompleted()
  async onQueueCompleted({ data }: Job<FeedQueueJobPayload>) {
    Logger.log(`Sync ${data.syncId} completed!`);

    await this.syncService.updateFeedSyncDate({
      feedId: data.feed.id,
      userId: data.userId,
      date: dayjs().toISOString(),
    });

    if (data.last) {
      await this.syncService.updateSync(data.syncId, {
        finishedAt: dayjs().toISOString(),
        status: SyncStatus.SUCCESS,
      });
    }
  }

  @OnQueueActive()
  async onQueueActive(job: Job<FeedQueueJobPayload>) {
    Logger.log(`Sync ${job.data.syncId} started!`);
    await this.syncService.updateSync(job.data.syncId, {
      status: SyncStatus.IN_PROGRESS,
    });
  }
}
