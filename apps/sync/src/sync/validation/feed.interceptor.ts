import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { syncFeedPayloadSchema } from "@syncreads/shared";

import { UserService } from "../../auth/user/user.service";
import { MAX_FEEDS_IN_ONE_SYNC } from "../../queue/feed/feed.constants";

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from "@nestjs/common";
import type { Request } from "express";

@Injectable()
export class SyncFeedInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { userId: string }>();
    const payload = syncFeedPayloadSchema.parse(request.body);

    const feeds = await this.userService.getUserFeeds(
      request.userId,
      payload.in,
    );
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

    return next.handle();
  }
}
