import { prisma } from "../../server/db/client";

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

export const getUserFeeds = ({ email }: { email: string }) => {
  return prisma.feed.findMany({
    include: { users: true },
    where: { users: { some: { email } } },
  });
};

export const getUserDevice = ({ email }: { email: string }) => {
  return prisma.device.findFirst({
    where: {
      user: {
        email,
      },
    },
  });
};

export const getUserFeedByUrl = ({
  email,
  url,
}: {
  email: string;
  url: string;
}) => {
  return prisma.feed.findFirst({
    where: { AND: [{ url }, { users: { some: { email } } }] },
    include: { users: true },
  });
};

export const deleteFeedFromUser = ({
  email,
  url,
}: {
  email: string;
  url: string;
}) => {
  return prisma.user.update({
    where: { email },
    data: {
      feeds: {
        disconnect: [{ url }],
      },
    },
  });
};

export const registerUserDevice = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  return prisma.device.create({
    data: { token, user: { connect: { email } } },
  });
};

export const unregisterUserDevice = ({ email }: { email: string }) => {
  return prisma.device.deleteMany({
    where: {
      user: { email },
    },
  });
};
