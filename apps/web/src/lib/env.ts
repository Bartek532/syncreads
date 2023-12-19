import { clientSchema, validateConfig } from "@rssmarkable/shared";

export const env = validateConfig(clientSchema, process.env);
