import type { Log } from "@rssmarkable/database";
import type { LOG_LEVEL } from "@rssmarkable/shared";

export type Logger = Record<LOG_LEVEL, (message: string) => Promise<Log>>;
