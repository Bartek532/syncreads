import { z } from "zod";

import { NODE_ENV, nodeEnvs } from "../constants/config";

const sharedSchema = z.object({
  NODE_ENV: nodeEnvs.default(NODE_ENV.DEVELOPMENT).optional(),
});

export const databaseSchema = sharedSchema.merge(
  z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  }),
);

export const serverSchema = sharedSchema.merge(
  z.object({
    CHROME_BIN: z.string(),
  }),
);

export type DatabaseConfig = z.infer<typeof databaseSchema>;
export type ServerConfig = z.infer<typeof serverSchema>;
