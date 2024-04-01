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
export const APP_NAME_APPENDIX =
  "Seamlessly sync articles and feeds from the web.";
export const APP_NAME_SEPARATOR = " | ";
export const APP_DESCRIPTION =
  "Say goodbye to your RSS reader. Sync your favorite content to selected device and read without distractions with just a few clicks.";
export const APP_ORIGIN = "syncreads.com";

export const nodeEnvs = z.nativeEnum(NODE_ENV);
