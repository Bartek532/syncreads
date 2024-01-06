import { SyncStatus, SyncTrigger } from "@rssmarkable/database";

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
