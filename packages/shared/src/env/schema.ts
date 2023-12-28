import { z } from "zod";

import { NODE_ENV, nodeEnvs } from "../constants/config";

const sharedSchema = z.object({
  NODE_ENV: nodeEnvs.default(NODE_ENV.DEVELOPMENT).optional(),
});

const authDatabaseSchema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
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
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
    REDIS_PASSWORD: z.string(),

    CHROME_BIN: z.string(),
  }),
);

export const webServerSchema = sharedSchema.merge(authDatabaseSchema).merge(
  z.object({
    SYNC_API_URL: z.string().url(),
  }),
);

export const webClientSchema = sharedSchema.merge(
  z.object({
    NEXT_PUBLIC_HOST: z.string().optional(),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
  }),
);

export type AnonDatabaseConfig = z.infer<typeof anonDatabaseSchema>;
export type ServiceDatabaseConfig = z.infer<typeof serviceDatabaseSchema>;
export type ServerConfig = z.infer<typeof serverSchema>;
export type WebServerConfig = z.infer<typeof webServerSchema>;
export type WebClientConfig = z.infer<typeof webClientSchema>;
