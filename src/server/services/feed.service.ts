import { prisma } from "../../server/db/client";

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

export const getFeedByUrl = ({ url }: { url: string }) => {
  return prisma.feed.findUnique({ where: { url }, include: { users: true } });
};

export const getAllFeeds = () => {
  return prisma.feed.findMany();
};

export const deleteFeed = ({ url }: { url: string }) => {
  return prisma.feed.delete({ where: { url } });
};
