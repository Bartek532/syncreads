import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compareSync } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { env } from "../../../env/server";
import { prisma } from "../../../server/db/client";
import { getUserByEmail } from "../../../server/services/user.service";
import { ApiError, HTTP_STATUS_CODE } from "../../../utils/exceptions";
import { loginUserSchema } from "../../../utils/validation/schema";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = Number(token.id);
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = +user.id;
        token.email = user.email ?? null;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
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

        const isValidPassword = compareSync(password, user.password);

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
