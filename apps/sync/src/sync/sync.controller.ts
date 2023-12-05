import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";

import { ApiKeyGuard } from "../auth/guards/api-key.guard";
import { UserService } from "../auth/user/user.service";

import { SyncArticlePayloadDto } from "./dto/article.dto";
// import { SyncService } from "./sync.service";

@Controller("sync")
export class SyncController {
  constructor(
    private readonly userService: UserService,
  ) // private readonly syncService: SyncService,
  {}

  @Post("article")
  @UseGuards(ApiKeyGuard)
  async handleSyncArticle(@Body() payload: SyncArticlePayloadDto) {
    const user = await this.userService.getUserById(payload.userId);

    if (!user) {
      throw new NotFoundException(`User with id ${payload.userId} not found!`);
    }

    // const sync = await this.syncService.createSync();

    // this.articleQueue.add();

    return {
      message: "Sync successfully queued!",
    };
  }
}
