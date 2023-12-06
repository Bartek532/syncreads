import { InjectQueue } from "@nestjs/bull";
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { SyncStatus, SyncTrigger } from "@rssmarkable/database";
import { Queue } from "bull";

import { ApiKeyGuard } from "../auth/guards/api-key.guard";
import { UserService } from "../auth/user/user.service";
import { ARTICLE_QUEUE_TOKEN } from "../queue/article/article.constants";
import {
  FEED_QUEUE_TOKEN,
  MAX_FEEDS_IN_ONE_SYNC,
} from "../queue/feed/feed.constants";

import { SyncArticlePayloadDto } from "./dto/article.dto";
import { SyncFeedPayloadDto } from "./dto/feed.dto";
import { SyncService } from "./sync.service";

import type { ArticleQueueJobPayload } from "../queue/article/types/article.types";
import type { FeedQueueJobPayload } from "../queue/feed/types/feed.types";

@Controller("sync")
export class SyncController {
  constructor(
    private readonly userService: UserService,
    private readonly syncService: SyncService,
    @InjectQueue(ARTICLE_QUEUE_TOKEN)
    private readonly articleQueue: Queue<ArticleQueueJobPayload>,
    @InjectQueue(FEED_QUEUE_TOKEN)
    private readonly feedQueue: Queue<FeedQueueJobPayload>,
  ) {}

  @Post("article")
  @UseGuards(ApiKeyGuard)
  async handleSyncArticle(@Body() payload: SyncArticlePayloadDto) {
    const user = await this.userService.getUserById(payload.userId);

    const sync = await this.syncService.createSync({
      userId: user.id,
      status: SyncStatus.QUEUED,
      trigger: SyncTrigger.MANUAL,
    });

    await this.articleQueue.add({
      userId: user.id,
      url: payload.url,
      syncId: sync.id,
    });

    return {
      sync,
      message: "Sync successfully queued!",
    };
  }

  @Post("feed")
  @UseGuards(ApiKeyGuard)
  async handleSyncFeed(@Body() payload: SyncFeedPayloadDto) {
    const user = await this.userService.getUserById(payload.userId);

    const feeds = await this.userService.getUserFeeds(user.id, payload.in);
    const ids = feeds.map((feed) => feed.feedId);

    if (ids.length !== payload.in.length) {
      throw new NotFoundException(
        `Feed(s) with id ${JSON.stringify(
          payload.in.filter((i) => !ids.includes(i)),
        )} not found!`,
      );
    }

    if (ids.length > MAX_FEEDS_IN_ONE_SYNC) {
      throw new BadRequestException(
        `You can only sync up to ${MAX_FEEDS_IN_ONE_SYNC} feeds at once!`,
      );
    }

    const sync = await this.syncService.createSync({
      userId: user.id,
      status: SyncStatus.QUEUED,
      trigger: SyncTrigger.MANUAL,
    });

    for (const feed of feeds) {
      await this.feedQueue.add({
        userId: user.id,
        feed: {
          id: feed.feedId,
          url: feed.Feed?.url ?? "",
          lastSyncDate: feed.lastSyncDate,
          startArticlesCount: feed.startArticlesCount,
        },
        syncId: sync.id,
        last: ids.indexOf(feed.feedId) === ids.length - 1,
      });
    }

    return {
      sync,
      message: "Sync successfully queued!",
    };
  }
}
