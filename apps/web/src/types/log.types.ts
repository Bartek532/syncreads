import type { Log } from "@rssmarkable/database";

export enum LOG_LEVEL {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  VERBOSE = "verbose",
}

export type Logger = Record<LOG_LEVEL, (message: string) => Promise<Log>>;
