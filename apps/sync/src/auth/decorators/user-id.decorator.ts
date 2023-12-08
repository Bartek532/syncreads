import { UnauthorizedException, createParamDecorator } from "@nestjs/common";

import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if ("userId" in request && typeof request.userId === "string") {
    return request.userId;
  }

  throw new UnauthorizedException(
    "Request is missing API KEY or supplied token is incorrect!ss",
  );
});
