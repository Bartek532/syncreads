import { prisma } from "src/server/db/client";

export const createFeed = async ({
  url,
  email,
}: {
  url: string;
  email: string;
}) => {
  return prisma.feed.upsert({
    where: { url },
    create: {
      url,
      users: {
        connect: { email },
      },
    },
    update: {
      users: { connect: { email } },
    },
  });
};

export const getFeedByUrl = async ({ url }: { url: string }) => {
  return prisma.feed.findUnique({ where: { url } });
};

export const getAllFeeds = async () => {
  return prisma.feed.findMany();
};

export const deleteFeed = async ({ id }: { id: number }) => {
  return prisma.feed.delete({ where: { id } });
};
