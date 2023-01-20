import { prisma } from "../../server/db/client";

import { getUserByEmail } from "./user.service";

export const createFeed = async ({
  url,
  email,
}: {
  url: string;
  email: string;
}) => {
  const feed = await prisma.feed.upsert({
    where: { url },
    create: { url },
    update: { url },
  });

  const user = await getUserByEmail({ email });

  if (!user) {
    return;
  }

  await prisma.userFeed.upsert({
    where: {
      userId_feedId: {
        userId: user.id,
        feedId: feed.id,
      },
    },
    create: {
      userId: user.id,
      feedId: feed.id,
    },
    update: {
      userId: user.id,
      feedId: feed.id,
    },
  });

  return feed;
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
