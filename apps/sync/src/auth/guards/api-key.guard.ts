import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserService } from "../user/user.service";

import type { CanActivate, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

const API_TOKEN_HEADER_NAME = "Authorization";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { userId?: string }>();

    const token = request.get(API_TOKEN_HEADER_NAME);

    if (!token) {
      throw new UnauthorizedException(
        "Request is missing API key or supplied key is invalid.",
      );
    }

    const key = await this.userService.getUserByApiKey(token);
    request["userId"] = key.userId;

    return true;
  }
}
