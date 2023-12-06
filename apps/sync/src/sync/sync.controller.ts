import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SyncStatus, SyncTrigger } from "@rssmarkable/database";
import { Queue } from "bull";

import { ApiKeyGuard } from "../auth/guards/api-key.guard";
import { UserService } from "../auth/user/user.service";
import { ARTICLE_QUEUE_TOKEN } from "../queue/article/article.constants";

import { SyncArticlePayloadDto } from "./dto/article.dto";
import { SyncService } from "./sync.service";

import type { ArticleQueueJobPayload } from "../queue/article/types/article.types";

@Controller("sync")
export class SyncController {
  constructor(
    private readonly userService: UserService,
    private readonly syncService: SyncService,
    @InjectQueue(ARTICLE_QUEUE_TOKEN)
    private readonly articleQueue: Queue<ArticleQueueJobPayload>,
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
      user,
      sync,
      message: "Sync successfully queued!",
    };
  }
}
