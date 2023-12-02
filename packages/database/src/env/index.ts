import { _env, schema } from "./schema";

import type { ZodFormattedError, z } from "zod";

export const formatErrors = <T>(errors: ZodFormattedError<T>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if ("_errors" in value && Array.isArray(value._errors)) {
        return `${name}: ${value._errors.join(", ")}\n`;
      }

      return;
    })
    .filter(Boolean);

const validateEnvVariables = () => {
  if (process.env.SKIP_ENV_VALIDATION === "1") {
    return _env as z.infer<typeof schema>;
  }

  const _validatedEnv = schema.safeParse(_env);

  if (!_validatedEnv.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(_validatedEnv.error.format()),
    );
    throw new Error("Invalid environment variables");
  }

  return _validatedEnv.data;
};

export const env = validateEnvVariables();
