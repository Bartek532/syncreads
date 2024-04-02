import { validateConfig, webServerSchema } from "@syncreads/shared";

export const env = validateConfig(webServerSchema, process.env);
