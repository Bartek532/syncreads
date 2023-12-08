import dayjs from "dayjs";

import {
  SYNC_LOGGER_PROVIDER_TOKEN,
  SYNC_QUEUED_LOG,
} from "./logger.constants";
import { LoggerService } from "./logger.service";
import { LOG_LEVEL } from "./types/logger.types";

import type { Logger } from "./types/logger.types";

export type SyncLoggerProviderFactory = (syncId: string) => Promise<Logger>;

export const syncLoggerProvider = {
  provide: SYNC_LOGGER_PROVIDER_TOKEN,
  useFactory: (loggerService: LoggerService) => {
    return async (syncId: string) => {
      const log = await loggerService.upsertLog(syncId, [SYNC_QUEUED_LOG()]);
      return Object.fromEntries(
        Object.values(LOG_LEVEL).map((level) => {
          return [
            level,
            (message: string) =>
              loggerService.updateLog(log.id, {
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
