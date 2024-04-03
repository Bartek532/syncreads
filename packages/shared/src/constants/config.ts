import { z } from "zod";

export enum NODE_ENV {
  TEST = "test",
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export enum LOG_LEVEL {
  ERROR = "error",
  WARN = "warn",
  LOG = "log",
  VERBOSE = "verbose",
}

export const APP_NAME = "SyncReads";
export const APP_NAME_APPENDIX = "Consume the web. Easier.";
export const APP_NAME_SEPARATOR = " | ";
export const APP_DESCRIPTION =
  "Seamlessly sync articles and feeds to read them without distractions in your favorite way at any time.";
export const APP_ORIGIN = "syncreads.com";

export const nodeEnvs = z.nativeEnum(NODE_ENV);
