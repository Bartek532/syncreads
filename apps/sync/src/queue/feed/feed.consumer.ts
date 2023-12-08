import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { SyncStatus } from "@rssmarkable/database";
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
    let articlesCount = 0;
    const feed = await this.userService.getUserFeed(data.userId, data.feedId);
    const user = await this.userService.getUserById(data.userId);

    const { updatedAt: feedSyncStartDate } = await (
      await this.syncLogger(data.syncId)
    ).log(`Starting synchronization of feed with url ${feed.Feed.url}...`);

    await (
      await this.syncLogger(data.syncId)
    ).log(
      feed.lastSyncDate
        ? `Syncing articles published after ${dayjs(feed.lastSyncDate).format(
            "DD-MM-YYYY",
          )}...`
        : `Syncing last ${feed.startArticlesCount} article(s)...`,
    );

    const items = await this.parserService.parseFeed(feed.Feed.url);
    const articles = items.filter(({ pubDate }, index) =>
      feed.lastSyncDate
        ? dayjs(pubDate).isAfter(feed.lastSyncDate)
        : index < feed.startArticlesCount,
    );

    await (
      await this.syncLogger(data.syncId)
    ).log(
      `Found ${articles.length} article(s) to synchronize within current feed.`,
    );

    for (const article of articles) {
      await this.feedQueueService.syncArticle({
        userId: data.userId,
        url: article.link,
        folder: user.user_metadata.folder,
        syncId: data.syncId,
      });

      articlesCount++;
      await this.syncService.updateSync(data.syncId, {
        syncedArticlesCount: articlesCount,
      });
    }

    await (
      await this.syncLogger(data.syncId)
    ).verbose(
      `Successfully synced feed ${feed.Feed.url} including **${
        articles.length
      }** articles: ${formatTime(dayjs().diff(feedSyncStartDate, "ms"))}`,
    );
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<FeedQueueJobPayload>, err: Error) {
    await (await this.syncLogger(job.data.syncId)).error(err.message);
    if (err.stack) {
      await (
        await this.syncLogger(job.data.syncId)
      ).error(`\`\`\`js
${err.stack}`);
    }
    // TODO handle deleting other jobs from the same sync
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
      lastSyncDate: dayjs().toISOString(),
    });

    await (
      await this.syncLogger(data.syncId)
    ).log(`Feed synchronization finished.`);

    if (data.last) {
      await this.syncService.updateSync(data.syncId, {
        finishedAt: dayjs().toISOString(),
        status: SyncStatus.SUCCESS,
      });

      await (
        await this.syncLogger(data.syncId)
      ).log(`Synchronization finished.`);
    }
  }

  @OnQueueActive()
  async onQueueActive(job: Job<FeedQueueJobPayload>) {
    await this.syncService.updateSync(job.data.syncId, {
      status: SyncStatus.IN_PROGRESS,
    });

    await (
      await this.syncLogger(job.data.syncId)
    ).log(`Article synchronization started.`);
  }
}
