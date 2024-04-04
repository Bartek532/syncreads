import type { SyncLog } from "@syncreads/database";
import type { LOG_LEVEL } from "@syncreads/shared";

export type Logger = Record<LOG_LEVEL, (message: string) => Promise<SyncLog>>;
