import { NotFoundException, createParamDecorator } from "@nestjs/common";

import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const Device = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if ("device" in request && typeof request.device === "object") {
    return request.device;
  }

  throw new NotFoundException("Device not found!");
});
