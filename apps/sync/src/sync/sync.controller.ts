import { InjectQueue } from "@nestjs/bull";
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  Device as DeviceType,
  SyncStatus,
  SyncTrigger,
} from "@rssmarkable/database";
import { clearUrl } from "@rssmarkable/shared";
import { Queue } from "bull";

import { UserId } from "../auth/decorators/user-id.decorator";
import { ApiKeyGuard } from "../auth/guards/api-key.guard";
import { ARTICLE_QUEUE_TOKEN } from "../queue/article/article.constants";
import { FEED_QUEUE_TOKEN } from "../queue/feed/feed.constants";

import { Device } from "./decorators/device.decorator";
import { SyncArticlePayloadDto, SyncFeedPayloadDto } from "./dto/sync.dto";
import { SyncService } from "./sync.service";
import { DeviceInterceptor } from "./validation/device.interceptor";
import { SyncFeedInterceptor } from "./validation/feed.interceptor";
import { LimiterInterceptor } from "./validation/limiter.interceptor";

import type { ArticleQueueJobPayload } from "../queue/article/types/article.types";
import type { FeedQueueJobPayload } from "../queue/feed/types/feed.types";

@Controller("sync")
export class SyncController {
  constructor(
    private readonly syncService: SyncService,
    @InjectQueue(ARTICLE_QUEUE_TOKEN)
    private readonly articleQueue: Queue<ArticleQueueJobPayload>,
    @InjectQueue(FEED_QUEUE_TOKEN)
    private readonly feedQueue: Queue<FeedQueueJobPayload>,
  ) {}

  @Post("article")
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(DeviceInterceptor, LimiterInterceptor)
  async handleSyncArticle(
    @Body() payload: SyncArticlePayloadDto,
    @UserId() userId: string,
    @Device() device: DeviceType,
  ) {
    const sync = await this.syncService.createSync({
      userId: userId,
      status: SyncStatus.QUEUED,
      trigger: SyncTrigger.MANUAL,
    });

    await this.articleQueue.add({
      userId: userId,
      url: clearUrl(payload.url),
      syncId: sync.id,
      device: device.type,
    });

    return {
      sync,
      message: "Sync successfully queued!",
    };
  }

  @Post("feed")
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(DeviceInterceptor, SyncFeedInterceptor, LimiterInterceptor)
  async handleSyncFeed(
    @Body() payload: SyncFeedPayloadDto,
    @UserId() userId: string,
    @Device() device: DeviceType,
  ) {
    const sync = await this.syncService.createSync({
      userId: userId,
      status: SyncStatus.QUEUED,
      trigger: SyncTrigger.MANUAL,
    });

    await this.feedQueue.addBulk(
      payload.in.map((feedId) => ({
        data: {
          userId: userId,
          feedId,
          syncId: sync.id,
          device: device.type,
          last: payload.in.indexOf(feedId) === payload.in.length - 1,
        },
      })),
    );

    return {
      sync,
      message: "Sync successfully queued!",
    };
  }
}
