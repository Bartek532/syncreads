import { logMessageSchema } from "./schema";

import type { LogMessage } from "./types";

export const isLogMessage = (message: unknown): message is LogMessage =>
  logMessageSchema.safeParse(message).success;
