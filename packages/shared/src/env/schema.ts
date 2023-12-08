import { z } from "zod";

import { NODE_ENV, nodeEnvs } from "../constants/config";

const sharedSchema = z.object({
  NODE_ENV: nodeEnvs.default(NODE_ENV.DEVELOPMENT).optional(),
});

export const anonDatabaseSchema = sharedSchema.merge(
  z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  }),
);

export const serviceDatabaseSchema = sharedSchema.merge(
  z.object({
    SUPABASE_URL: z.string().url(),
    SUPABASE_SERVICE_KEY: z.string(),
  }),
);

export const serverSchema = sharedSchema.merge(
  z.object({
    CHROME_BIN: z.string(),

    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
    REDIS_PASSWORD: z.string(),
  }),
);

export type AnonDatabaseConfig = z.infer<typeof anonDatabaseSchema>;
export type ServiceDatabaseConfig = z.infer<typeof serviceDatabaseSchema>;
export type ServerConfig = z.infer<typeof serverSchema>;
