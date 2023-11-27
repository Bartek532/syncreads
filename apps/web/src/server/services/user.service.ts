import { prisma } from "../db/client";

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const createUser = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  return prisma.user.create({ data: { email, password, name } });
};

export const getUserByEmail = ({ email }: { email: string }) => {
  return prisma.user.findUnique({
    where: { email },
    include: { device: true, feeds: true },
  });
};

export const getUserById = ({ id }: { id: number }) => {
  return prisma.user.findUnique({
    where: { id },
    include: { device: true, feeds: true },
  });
};

export const getUserFeeds = ({ id }: { id: number }) => {
  return prisma.feed.findMany({
    include: { users: true },
    where: { users: { some: { user: { id } } } },
  });
};

export const getUserFeed = ({
  userId,
  url,
}: {
  userId: number;
  url: string;
}) => {
  return prisma.userFeed.findFirst({
    where: {
      AND: [
        {
          user: { id: userId },
        },
        { feed: { url } },
      ],
    },
  });
};

export const updateFeedSyncDate = ({
  userId,
  feedId,
  date,
}: {
  userId: number;
  feedId: number;
  date?: Date;
}) => {
  return prisma.userFeed.update({
    where: {
      userId_feedId: {
        userId,
        feedId,
      },
    },
    data: {
      lastSyncDate: date ?? new Date(),
    },
  });
};

export const getUserDevice = ({ id }: { id: number }) => {
  return prisma.device.findUnique({
    where: {
      userId: id,
    },
  });
};

export const getUserFeedByUrl = ({ id, url }: { id: number; url: string }) => {
  return prisma.feed.findFirst({
    where: { AND: [{ url }, { users: { some: { user: { id } } } }] },
    include: { users: true },
  });
};

export const deleteFeedFromUser = ({
  id,
  url,
}: {
  id: number;
  url: string;
}) => {
  return prisma.userFeed.deleteMany({
    where: { user: { id }, feed: { url } },
  });
};

export const registerUserDevice = ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  return prisma.device.create({
    data: { token, user: { connect: { id } } },
  });
};

export const unregisterUserDevice = ({ id }: { id: number }) => {
  return prisma.device.delete({
    where: {
      userId: id,
    },
  });
};
