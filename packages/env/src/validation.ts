import type { ZodFormattedError, ZodSchema, z } from "zod";

const formatErrors = <T>(errors: ZodFormattedError<T>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if ("_errors" in value && Array.isArray(value._errors)) {
        return `${name}: ${value._errors.join(", ")}\n`;
      }

      return;
    })
    .filter(Boolean);

export const validateConfig = <T>(
  schema: ZodSchema<T>,
  env: Record<string, unknown>,
): T => {
  if (process.env.SKIP_ENV_VALIDATION === "1") {
    return env as z.infer<typeof schema>;
  }

  const _validatedEnv = schema.safeParse(env);

  if (!_validatedEnv.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(_validatedEnv.error.format()),
    );
    throw new Error("Invalid environment variables");
  }

  return _validatedEnv.data;
};
