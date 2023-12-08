import type { Log } from "@rssmarkable/database";

export enum LOG_LEVEL {
  ERROR = "error",
  WARN = "warn",
  LOG = "log",
  VERBOSE = "verbose",
}

export type LogMessage = {
  readonly level: LOG_LEVEL;
  readonly message: string;
  readonly date: string;
};

export type Logger = Record<LOG_LEVEL, (message: string) => Promise<Log>>;
