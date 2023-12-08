import { ApiError } from "next/dist/server/api-utils";

import {
  SYNCS_PAGINATION_DEFAULT_PAGE,
  SYNCS_PAGINATION_DEFAULT_PER_PAGE,
} from "../../config/sync";
import { getUserSyncs } from "../services/sync.service";

import type { OffsetPaginationInput } from "../../utils/validation/types";

// export const createSyncLogger = async (syncId: string) => {
//   const START_LOG = SYNC_START_LOG();

//   const log = await createLog(syncId, [START_LOG]);
//   await publisher.publish(`sync-${syncId}`, JSON.stringify(START_LOG));

//   const logger = Object.fromEntries(
//     Object.values(LOG_LEVEL).map((level) => {
//       return [
//         level,
//         (message: string) =>
//           updateLog(log.id, { message, date: new Date().toISOString(), level }),
//       ] as const;
//     }),
//   ) as Logger;

//   return logger;
// };

export const getUserSyncsHandler = async ({
  id,
  page,
  perPage,
}: OffsetPaginationInput & { id: string }) => {
  const { data, error, count, status } = await getUserSyncs({
    id,
    page: page ?? SYNCS_PAGINATION_DEFAULT_PAGE,
    perPage: perPage ?? SYNCS_PAGINATION_DEFAULT_PER_PAGE,
  });

  if (error) {
    throw new ApiError(status, error.message);
  }

  return { count, data };
};

// export const getSyncLogHandler = async (syncId: string) => {
//   return getSyncLog(syncId);
// };
