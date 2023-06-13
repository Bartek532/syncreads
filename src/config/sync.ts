import { SyncTrigger } from "@prisma/client";

import { LOG_LEVEL } from "../../types/log.types";

export const PDF_OPTIONS = {
  format: "A4",
  margin: { top: 30, bottom: 30, left: 30, right: 30 },
  printBackground: true,
  timeout: 0,
} as const;

export const SYNC_DEFAULT_FOLDER_NAME = "RSS";
export const SYNCS_PAGINATION_DEFAULT_PAGE = 1;
export const SYNCS_PAGINATION_DEFAULT_PER_PAGE = 10;
export const SYNCS_PAGINATION_DEFAULT_LIMIT = 10;

export const SYNC_TRIGGER_EMOJIS: Record<SyncTrigger, string> = {
  [SyncTrigger.MANUAL]: "✋",
  [SyncTrigger.SCHEDULE]: "📅",
};

export const SYNC_STATUS_STYLES = {
  SUCCESS: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  FAILED: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
  UNKNOWN: "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900",
};

export const SYNC_START_LOG = () => ({
  level: LOG_LEVEL.INFO,
  message: "Synchronization is starting...",
  date: new Date().toISOString(),
});
