import { SyncStatus, SyncTrigger } from "@rssmarkable/database";

export const SYNCS_PAGINATION_DEFAULT_PAGE = 1;
export const SYNCS_PAGINATION_DEFAULT_PER_PAGE = 10;
export const SYNCS_PAGINATION_DEFAULT_LIMIT = 10;

export const SYNC_TRIGGER_EMOJIS: Record<SyncTrigger, string> = {
  [SyncTrigger.MANUAL]: "✋",
  [SyncTrigger.SCHEDULE]: "📅",
};

export const SYNC_STATUS_STYLES = {
  [SyncStatus.SUCCESS]:
    "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
  [SyncStatus.IN_PROGRESS]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  [SyncStatus.FAILED]:
    "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
  [SyncStatus.QUEUED]:
    "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900",
  [SyncStatus.UNKNOWN]:
    "bg-gray-100 text-gray-800 dark:bg-gray-200 dark:text-gray-900",
};
