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

export const nodeEnvs = z.nativeEnum(NODE_ENV);
