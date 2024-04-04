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
export const APP_NAME_APPENDIX = "Consume the web easier.";
export const APP_NAME_SEPARATOR = " | ";
export const APP_DESCRIPTION =
  "Seamlessly sync articles and feeds for distraction-free reading, customized to your preferences, anytime, anywhere.";
export const APP_ORIGIN = "syncreads.com";

export const nodeEnvs = z.nativeEnum(NODE_ENV);
