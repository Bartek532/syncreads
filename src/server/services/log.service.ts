import { publisher } from "../../lib/redis";
import { prisma } from "../../server/db/client";
import { ApiError, HTTP_STATUS_CODE } from "../../utils/exceptions";

import type { LogMessage } from "../../utils/validation/types";

export const getLogById = (id: number) => {
  return prisma.log.findUnique({ where: { id } });
};

export const getSyncLog = (syncId: string) => {
  return prisma.log.findUnique({ where: { syncId } });
};

export const createLog = (syncId: string, json: LogMessage[]) => {
  return prisma.log.create({
    data: {
      json: JSON.stringify(json),
      sync: {
        connect: {
          id: syncId,
        },
      },
    },
  });
};

export const updateLog = async (logId: number, json: LogMessage) => {
  const log = await getLogById(logId);

  if (!log) {
    throw new ApiError(
      HTTP_STATUS_CODE.NOT_FOUND,
      `Log with id ${logId} has not been found!`,
    );
  }

  const previousLogJson = JSON.parse(log.json as string) as LogMessage[];

  const updatedLog = await prisma.log.update({
    where: {
      id: logId,
    },
    data: {
      json: JSON.stringify([...previousLogJson, json]),
    },
  });

  await publisher.publish(`sync-${log.syncId}`, JSON.stringify(json));

  return updatedLog;
};
