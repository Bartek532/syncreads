import { validateConfig, webClientSchema } from "@syncreads/shared";

const localEnv = {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
};

export const env = validateConfig(webClientSchema, localEnv);
