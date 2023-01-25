import { SyncStatus } from "@prisma/client";

import { prisma } from "../../server/db/client";

import type { Sync } from "@prisma/client";

export const createSync = ({ id }: { id: number }) => {
  return prisma.sync.create({
    data: {
      status: SyncStatus.PENDING,
      user: {
        connect: { id },
      },
    },
  });
};

export const updateSync = ({
  id,
  data,
}: {
  id: string;
  data: Partial<Sync>;
}) => {
  return prisma.sync.update({
    where: { id },
    data,
  });
};

export const getUserSyncs = ({
  id,
  page,
  perPage,
}: {
  id: number;
  page: number;
  perPage: number;
}) => {
  return prisma.$transaction([
    prisma.sync.count({ where: { userId: id } }),
    prisma.sync.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      where: {
        userId: id,
      },
      orderBy: {
        startedAt: "desc",
      },
    }),
    prisma.sync.aggregate({
      _sum: { syncedArticlesCount: true },
      where: { userId: id },
    }),
  ]);
};
