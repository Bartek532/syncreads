import { validateConfig, webClientSchema } from "@syncreads/shared";

export const env = validateConfig(webClientSchema, process.env);
