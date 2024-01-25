// @ts-expect-error - missing type definitions
import { webcrypto } from "crypto";
import { remarkable } from "rmapi-js";

import type { SubtleCryptoLike } from "rmapi-js";

export const getClient = async (token: string) => {
  return webcrypto
    ? remarkable(token, {
        subtle: (webcrypto as unknown as { subtle: SubtleCryptoLike }).subtle,
      })
    : remarkable(token);
};
