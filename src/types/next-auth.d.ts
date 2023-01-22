import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      email: string;
    } & DefaultSession["user"];
  }

  interface DefaultUser {
    id: number;
  }
}

declare module "next-auth/jwt" {
  interface DefaultUser {
    id: number;
  }
}
