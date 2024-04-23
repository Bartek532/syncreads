import { extensionSchema, validateConfig } from "@syncreads/env";

export const env = validateConfig(extensionSchema, import.meta.env);
