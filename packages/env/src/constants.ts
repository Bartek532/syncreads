import { z } from "zod";

export enum NODE_ENV {
  TEST = "test",
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export const nodeEnvs = z.nativeEnum(NODE_ENV);
