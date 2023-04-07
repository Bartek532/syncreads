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

export const SYNC_START_LOG = () => ({
  level: LOG_LEVEL.INFO,
  message: "Synchronization is starting...",
  date: new Date().toISOString(),
});
