import { prisma } from "src/server/db/client";

export const createFeed = async ({ url }: { url: string }) => {
  return prisma.feed.create({
    data: { url },
  });
};

export const getAllFeeds = async () => {
  return prisma.feed.findMany();
};

export const deleteFeed = async ({ id }: { id: number }) => {
  return prisma.feed.delete({ where: { id } });
};
