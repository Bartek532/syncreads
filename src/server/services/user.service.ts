import { prisma } from "src/server/db/client";

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
  return prisma.user.findUnique({ where: { email } });
};

export const getUserFeeds = ({ email }: { email: string }) => {
  return prisma.feed.findMany({
    include: { users: true },
    where: { users: { some: { email } } },
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
