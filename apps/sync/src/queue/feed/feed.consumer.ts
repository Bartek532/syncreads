import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { SyncStatus } from "@syncreads/database";
import { clearUrl } from "@syncreads/shared";
import { Job } from "bull";
import dayjs from "dayjs";

import { UserService } from "../../auth/user/user.service";
import { ParserService } from "../../parser/parser.service";
import { SYNC_LOGGER_PROVIDER_TOKEN } from "../../sync/logger/logger.constants";
import { SyncLoggerProviderFactory } from "../../sync/logger/logger.provider";
import { formatTime } from "../../sync/logger/utils/time";
import { SyncService } from "../../sync/sync.service";

import { FEED_QUEUE_TOKEN } from "./feed.constants";
import { FeedQueueService } from "./feed.service";

import type { FeedQueueJobPayload } from "./types/feed.types";

@Processor(FEED_QUEUE_TOKEN)
export class FeedQueueConsumer {
  constructor(
    private readonly parserService: ParserService,
    private readonly syncService: SyncService,
    private readonly userService: UserService,
    private readonly feedQueueService: FeedQueueService,
    @Inject(SYNC_LOGGER_PROVIDER_TOKEN)
    private readonly syncLogger: SyncLoggerProviderFactory,
  ) {}

  @Process()
  async syncFeed({ data }: Job<FeedQueueJobPayload>) {
    const feed = await this.userService.getUserFeed(data.userId, data.feedId);
    const user = await this.userService.getUserById(data.userId);

    const { updatedAt: feedSyncStartDate } = await this.syncLogger(
      data.syncId,
    ).log(`Starting synchronization of feed with url ${feed.feed.url}...`);

    await this.syncLogger(data.syncId).log(
      feed.lastSyncedAt
        ? `Syncing articles published after ${dayjs(feed.lastSyncedAt).format(
            "DD-MM-YYYY",
          )}...`
        : `Syncing last ${feed.startArticlesCount} article(s)...`,
    );

    const items = await this.parserService.parseFeed(feed.feed.url);
    const articles = items.filter(({ pubDate }, index) =>
      feed.lastSyncedAt
        ? dayjs(pubDate).isAfter(feed.lastSyncedAt)
        : index < feed.startArticlesCount,
    );

    await this.syncLogger(data.syncId).log(
      `Found ${articles.length} article(s) to synchronize within current feed.`,
    );

    for (const article of articles) {
      const url = clearUrl(article.link);

      await this.feedQueueService.syncArticle({
        userId: data.userId,
        syncId: data.syncId,
        url,
        device: {
          folder: user.user_metadata.folder,
          type: data.device,
        },
        options: data.options,
      });

      await this.syncService.createSyncArticle({
        syncId: data.syncId,
        url,
      });
    }

    await this.syncLogger(data.syncId).verbose(
      `Successfully synced feed ${feed.feed.url} including **${
        articles.length
      }** article(s): ${formatTime(dayjs().diff(feedSyncStartDate, "ms"))}`,
    );
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<FeedQueueJobPayload>, err: Error) {
    await this.syncLogger(job.data.syncId).error(err.message);
    if (err.stack) {
      await this.syncLogger(job.data.syncId).error(`\`\`\`js
${err.stack}`);
    }
    // TODO handle deleting other jobs from the same sync?
    if (job.data.last) {
      await this.syncService.updateSync(job.data.syncId, {
        finishedAt: dayjs().toISOString(),
        status: SyncStatus.FAILED,
      });
    }
  }

  @OnQueueCompleted()
  async onQueueCompleted({ data }: Job<FeedQueueJobPayload>) {
    await this.userService.updateUserFeed(data.userId, data.feedId, {
      lastSyncedAt: dayjs().toISOString(),
    });

    await this.syncLogger(data.syncId).log(`Feed synchronization finished.`);

    if (data.last) {
      await this.syncService.updateSync(data.syncId, {
        finishedAt: dayjs().toISOString(),
        status: SyncStatus.SUCCESS,
      });

      await this.syncLogger(data.syncId).log(`Synchronization finished.`);
    }
  }

  @OnQueueActive()
  async onQueueActive(job: Job<FeedQueueJobPayload>) {
    await this.syncService.updateSync(job.data.syncId, {
      status: SyncStatus.IN_PROGRESS,
    });

    await this.syncLogger(job.data.syncId).log(`Feed synchronization started.`);
  }
}
