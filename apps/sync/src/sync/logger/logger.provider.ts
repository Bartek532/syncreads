import dayjs from "dayjs";

import { SYNC_LOGGER_PROVIDER_TOKEN } from "./logger.constants";
import { LoggerService } from "./logger.service";
import { LOG_LEVEL } from "./types/logger.types";

import type { Logger } from "./types/logger.types";

export type SyncLoggerProviderFactory = (syncId: string) => Logger;

export const syncLoggerProvider = {
  provide: SYNC_LOGGER_PROVIDER_TOKEN,
  useFactory: (loggerService: LoggerService) => {
    return (syncId: string) => {
      return Object.fromEntries(
        Object.values(LOG_LEVEL).map((level) => {
          return [
            level,
            (message: string) =>
              loggerService.updateLogBySyncId(syncId, {
                message,
                date: dayjs().toISOString(),
                level,
              }),
          ] as const;
        }),
      ) as Logger;
    };
  },
  inject: [LoggerService],
};
