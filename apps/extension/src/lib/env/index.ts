import { extensionSchema, validateConfig } from "@syncreads/shared";

export const env = validateConfig(extensionSchema, import.meta.env);
