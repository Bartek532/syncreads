import { LOG_LEVEL } from "../../../types/log.types";
import {
  SYNCS_PAGINATION_DEFAULT_PAGE,
  SYNCS_PAGINATION_DEFAULT_PER_PAGE,
  SYNC_START_LOG,
} from "../../config/sync";
import { publisher } from "../../lib/redis";
import { createLog, getSyncLog, updateLog } from "../services/log.service";
import { getUserSyncs } from "../services/sync.service";

import type { Logger } from "../../../types/log.types";
import type { OffsetPaginationInput } from "../../utils/validation/types";

export const createSyncLogger = async (syncId: string) => {
  const START_LOG = SYNC_START_LOG();

  const log = await createLog(syncId, [START_LOG]);
  await publisher.publish(`sync-${syncId}`, JSON.stringify(START_LOG));

  const logger = Object.fromEntries(
    Object.values(LOG_LEVEL).map((level) => {
      return [
        level,
        (message: string) =>
          updateLog(log.id, { message, date: new Date().toString(), level }),
      ] as const;
    }),
  ) as Logger;

  return logger;
};

export const getUserSyncsHandler = async ({
  id,
  page,
  perPage,
}: OffsetPaginationInput & { id: number }) => {
  try {
    const [total, syncs, articles] = await getUserSyncs({
      id,
      page: page ?? SYNCS_PAGINATION_DEFAULT_PAGE,
      perPage: perPage ?? SYNCS_PAGINATION_DEFAULT_PER_PAGE,
    });

    return { total, syncs, articles: articles._sum.syncedArticlesCount ?? 0 };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSyncLogHandler = async (syncId: string) => {
  return getSyncLog(syncId);
};
