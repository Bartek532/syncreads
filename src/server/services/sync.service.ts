import { SyncStatus } from "@prisma/client";
import puppeteer from "puppeteer-core";

import { env } from "../../env/server";
import { prisma } from "../../server/db/client";

import type { Sync, SyncTrigger } from "@prisma/client";
import type { Browser } from "puppeteer-core";

export const createSync = ({
  id,
  trigger,
}: {
  id: number;
  trigger: SyncTrigger;
}) => {
  return prisma.sync.create({
    data: {
      status: SyncStatus.PENDING,
      trigger,
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

export const getPage = async (passedBrowser?: Browser) => {
  const browser =
    passedBrowser ??
    (await puppeteer.launch({
      executablePath: env.CHROME_BIN,
      args: [
        // Required for Docker version of Puppeteer
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        "--disable-dev-shm-usage",
      ],
    }));
  return browser.newPage();
};
