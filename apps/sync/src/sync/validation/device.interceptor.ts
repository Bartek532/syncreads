import { Injectable } from "@nestjs/common";

import { UserService } from "../../auth/user/user.service";

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from "@nestjs/common";
import type { Device } from "@syncreads/database";
import type { Request } from "express";

@Injectable()
export class DeviceInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { userId: string; device?: Device }>();

    const device = await this.userService.getUserDevice(request.userId);
    request["device"] = device;

    return next.handle();
  }
}
