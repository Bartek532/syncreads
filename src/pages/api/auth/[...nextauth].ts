import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "src/server/services/user.service";
import { ApiError, HTTP_STATUS_CODE } from "src/utils/exceptions";
import { loginUserSchema } from "src/utils/validation";

import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? null;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  secret: "secret",
  providers: [
    /*
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    */
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@doe.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = await loginUserSchema.parseAsync(
          credentials,
        );

        const user = await getUserByEmail({ email });
        if (!user?.password) {
          throw new ApiError(
            HTTP_STATUS_CODE.NOT_FOUND,
            "Something went wrong, check your credentials and try again!",
          );
        }

        const isValidPassword = password === user.password;
        //await compare(password, user.password);
        if (!isValidPassword) {
          throw new ApiError(
            HTTP_STATUS_CODE.NOT_FOUND,
            "Something went wrong, check your credentials and try again!",
          );
        }

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
};

export default NextAuth(authOptions);
