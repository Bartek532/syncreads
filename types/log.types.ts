import type { Log } from "@prisma/client";

export enum LOG_LEVEL {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  VERBOSE = "verbose",
}

export interface LogMessage {
  message: string;
  date: Date;
  level: LOG_LEVEL;
}

export type Logger = Record<LOG_LEVEL, (message: string) => Promise<Log>>;
