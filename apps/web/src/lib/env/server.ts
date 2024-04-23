import { validateConfig, webServerSchema } from "@syncreads/env";

export const env = validateConfig(webServerSchema, process.env);
