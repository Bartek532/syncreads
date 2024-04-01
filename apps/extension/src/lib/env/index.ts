import { extensionSchema, validateConfig } from "@rssmarkable/shared";

export const env = validateConfig(extensionSchema, import.meta.env);
