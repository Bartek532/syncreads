import { HttpException, Injectable } from "@nestjs/common";
import { HTTP_STATUS_CODE } from "@syncreads/shared";
import dayjs from "dayjs";

import { UserService } from "../../auth/user/user.service";

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from "@nestjs/common";
import type { Request } from "express";

const MAX_SYNCS_PER_HOUR = 35;

@Injectable()
export class LimiterInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { userId: string }>();

    const previousHour = dayjs().subtract(1, "hour").toDate();
    const now = dayjs().toDate();

    const syncs = await this.userService.getUserSyncs(request.userId, {
      from: previousHour,
      to: now,
    });

    if (syncs.length >= MAX_SYNCS_PER_HOUR) {
      throw new HttpException(
        `You can only sync up to ${MAX_SYNCS_PER_HOUR} times within an hour!`,
        HTTP_STATUS_CODE.TOO_MANY_REQUESTS,
      );
    }

    return next.handle();
  }
}
