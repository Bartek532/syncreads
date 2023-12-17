import { getUserSyncs } from "../services/sync.service";

import { ApiError } from "@/utils/exceptions";

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

export const getUserSyncsHandler = async ({ id }: { id: string }) => {
  const { data, error, status } = await getUserSyncs({
    id,
  });

  if (error) {
    throw new ApiError(status, error.message);
  }

  return data;
};

// export const getSyncLogHandler = async (syncId: string) => {
//   return getSyncLog(syncId);
// };
