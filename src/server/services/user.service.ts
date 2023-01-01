import { prisma } from "src/server/db/client";

export const createUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return prisma.user.create({ data: { email, password } });
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
