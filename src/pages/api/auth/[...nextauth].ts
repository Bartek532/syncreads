import NextAuth, { type NextAuthOptions } from "next-auth";
//import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { loginUserSchema } from "src/utils/validation";
import { getUserByEmail } from "src/server/services/user.service";
import { verify } from "argon2";

export const authOptions: NextAuthOptions = {
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  /*
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  */
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
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
      authorize: async (credentials, request) => {
        const { email, password } = await loginUserSchema.parseAsync(
          credentials
        );

        const user = await getUserByEmail({ email });
        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, password);
        if (!isValidPassword) {
          return null;
        }

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
};

export default NextAuth(authOptions);
