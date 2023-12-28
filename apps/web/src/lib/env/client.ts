import { validateConfig, webClientSchema } from "@rssmarkable/shared";

export const env = validateConfig(webClientSchema, process.env);
