import { validateConfig, webServerSchema } from "@rssmarkable/shared";

export const env = validateConfig(webServerSchema, process.env);
