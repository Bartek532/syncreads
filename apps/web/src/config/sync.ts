import { SyncTrigger } from "@rssmarkable/database";

export const SYNCS_PAGINATION_DEFAULT_PAGE = 1;
export const SYNCS_PAGINATION_DEFAULT_PER_PAGE = 10;
export const SYNCS_PAGINATION_DEFAULT_LIMIT = 10;
export const SYNCS_PAGINATION_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25];

export const SYNC_TRIGGER_EMOJIS: Record<SyncTrigger, string> = {
  [SyncTrigger.MANUAL]: "✋",
  [SyncTrigger.SCHEDULE]: "📅",
};
