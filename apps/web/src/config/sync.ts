import { SyncStatus, SyncTrigger } from "@rssmarkable/database";
import { LOG_LEVEL } from "@rssmarkable/shared";

export const SYNCS_PAGINATION_DEFAULT_PAGE = 1;
export const SYNCS_PAGINATION_DEFAULT_PER_PAGE = 10;
export const SYNCS_PAGINATION_DEFAULT_LIMIT = 10;
export const SYNCS_PAGINATION_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25];

export const SYNC_TRIGGER_EMOJIS: Record<SyncTrigger, string> = {
  [SyncTrigger.MANUAL]: "✋",
  [SyncTrigger.SCHEDULE]: "📅",
};

export const SYNC_STATUS_COLORS: Record<SyncStatus, string> = {
  [SyncStatus.FAILED]: "bg-destructive-foreground",
  [SyncStatus.SUCCESS]: "bg-success-foreground",
  [SyncStatus.IN_PROGRESS]: "bg-warning-foreground",
  [SyncStatus.QUEUED]: "bg-sky-foreground",
  [SyncStatus.UNKNOWN]: "bg-muted-foreground",
};

export const SYNC_LOG_LEVEL_COLORS: Record<LOG_LEVEL, string> = {
  [LOG_LEVEL.LOG]: "bg-background hover:bg-accent",
  [LOG_LEVEL.ERROR]:
    "bg-destructive/60 text-destructive-foreground hover:bg-destructive",
  [LOG_LEVEL.VERBOSE]: "bg-sky/60 text-sky-foreground hover:bg-sky",
  [LOG_LEVEL.WARN]: "bg-warning/60 text-warning-foreground hover:bg-warning",
};
