import { clientEnv, clientSchema } from "./schema";

import type { ZodFormattedError } from "zod";

const _clientEnv = clientSchema.safeParse(clientEnv);

export const formatErrors = <T>(errors: ZodFormattedError<T>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if ("_errors" in value && Array.isArray(value._errors)) {
        return `${name}: ${value._errors.join(", ")}\n`;
      }

      return;
    })
    .filter(Boolean);

if (!_clientEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_clientEnv.error.format()),
  );
  throw new Error("Invalid environment variables");
}

for (const key of Object.keys(_clientEnv.data)) {
  if (!key.startsWith("NEXT_PUBLIC_")) {
    console.warn(
      `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
    );

    throw new Error("Invalid public environment variable name");
  }
}

export const env = _clientEnv.data;
