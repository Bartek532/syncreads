import { LOG_LEVEL } from "@syncreads/shared";
import dayjs from "dayjs";

export const SYNC_LOGGER_PROVIDER_TOKEN = Symbol("SYNC_LOGGER_PROVIDER_TOKEN");
export const SYNC_QUEUED_LOG = () => ({
  level: LOG_LEVEL.LOG,
  message: "Synchronization queued, will start in a minute...",
  date: dayjs().toISOString(),
});
