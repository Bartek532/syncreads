import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { CanActivate, ExecutionContext } from "@nestjs/common";
import type { ServerConfig } from "@rssmarkable/shared";
import type { Request } from "express";
import type { Observable } from "rxjs";

const API_TOKEN_HEADER_NAME = "Authorization";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService<ServerConfig>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.get(API_TOKEN_HEADER_NAME);
    const isTokenValid = token === this.configService.get("API_KEY");

    if (!isTokenValid) {
      throw new UnauthorizedException(
        "Request is missing API KEY or supplied token is incorrect",
      );
    }

    return true;
  }
}
