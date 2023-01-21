import { SyncStatus } from "@prisma/client";

import { prisma } from "../../server/db/client";

import type { Sync } from "@prisma/client";

export const createSync = ({ email }: { email: string }) => {
  return prisma.sync.create({
    data: {
      status: SyncStatus.PENDING,
      user: {
        connect: { email },
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
  email,
  page,
  perPage,
}: {
  email: string;
  page: number;
  perPage: number;
}) => {
  return prisma.$transaction([
    prisma.sync.count({ where: { user: { email } } }),
    prisma.sync.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      where: {
        user: { email },
      },
      orderBy: {
        startedAt: "desc",
      },
    }),
    prisma.sync.aggregate({
      _sum: { syncedArticlesCount: true },
      where: { user: { email } },
    }),
  ]);
};
