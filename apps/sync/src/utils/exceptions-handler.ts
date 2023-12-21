import { Catch, Logger, HttpException, HttpStatus } from "@nestjs/common";

import type { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import type { Response } from "express";
import type { IncomingMessage } from "http";

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : typeof exception === "object" && exception && "status" in exception
    ? Number(exception.status)
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: unknown): string => {
  return typeof exception === "object" && exception && "message" in exception
    ? String(exception.message)
    : String(exception);
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const status = getStatusCode(exception);
    const message = getErrorMessage(exception);

    Logger.error(exception);

    response.status(status).json({
      error: {
        timestamp: new Date().toISOString(),
        path: request.url,
        status,
        message,
      },
    });
  }
}
