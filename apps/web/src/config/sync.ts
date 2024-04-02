import { SyncStatus, SyncTrigger } from "@syncreads/database";
import { LOG_LEVEL } from "@syncreads/shared";

export const SYNCS_PAGINATION_DEFAULT_PAGE = 1;
export const SYNCS_PAGINATION_DEFAULT_PER_PAGE = 10;
export const SYNCS_PAGINATION_DEFAULT_LIMIT = 10;
export const SYNCS_PAGINATION_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25];

export const SYNC_TRIGGER_EMOJIS: Record<SyncTrigger, string> = {
  [SyncTrigger.MANUAL]: "✋",
  [SyncTrigger.SCHEDULE]: "📅",
};

export const SYNC_STATUS_COLORS: Record<SyncStatus, string> = {
  [SyncStatus.FAILED]: "bg-destructive",
  [SyncStatus.SUCCESS]: "bg-success",
  [SyncStatus.IN_PROGRESS]: "bg-warning",
  [SyncStatus.QUEUED]: "bg-sky",
  [SyncStatus.UNKNOWN]: "bg-muted-foreground",
};

export const SYNC_LOG_LEVEL_COLORS: Record<LOG_LEVEL, string> = {
  [LOG_LEVEL.LOG]: "bg-background hover:bg-accent",
  [LOG_LEVEL.ERROR]:
    "bg-destructive/20 text-destructive hover:bg-destructive/40",
  [LOG_LEVEL.VERBOSE]: "bg-sky/20 text-sky hover:bg-sky/40",
  [LOG_LEVEL.WARN]: "bg-warning/20 text-warning hover:bg-warning/40",
};
