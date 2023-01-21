import { type DefaultSession } from "next-auth";

import type { Device } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      email: string;
      /** User reMarkable device */
      device: Device | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** User reMarkable device */
    device: Device | null;
  }

  interface DefaultUser {
    /** User reMarkable device */
    device: Device | null;
    id: number;
  }
}
