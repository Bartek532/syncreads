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
