import type { Database } from "./generated/schema";
import type { User as UserType } from "@supabase/supabase-js";

// Generics
type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Tables
export type Device = Tables<"Device">;
export type Feed = Tables<"Feed">;
export type Log = Tables<"Log">;
export type Sync = Tables<"Sync">;
export type UserFeed = Tables<"UserFeed">;

// Enums
export type SyncStatus = Enums<"SyncStatus">;
export type SyncTrigger = Enums<"SyncTrigger">;

export const SyncStatus: { [K in SyncStatus]: K } = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PENDING: "PENDING",
  UNKNOWN: "UNKNOWN",
} as const;

export const SyncTrigger: { [K in SyncTrigger]: K } = {
  MANUAL: "MANUAL",
  SCHEDULE: "SCHEDULE",
} as const;

// Auth
type UserMetadata = {
  name?: string;
  folder?: string;
};
export type User = UserType & { user_metadata: UserMetadata };

export type { Session } from "@supabase/supabase-js";
