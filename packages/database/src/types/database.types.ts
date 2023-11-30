import type { Database } from "./generated/schema";

type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type Account = Tables<"Account">;
export type Device = Tables<"Device">;
export type Feed = Tables<"Feed">;
export type Log = Tables<"Log">;
export type User = Tables<"User">;
export type Session = Tables<"Session">;
export type Sync = Tables<"Sync">;
export type UserFeed = Tables<"UserFeed">;
export type VerificationToken = Tables<"VerificationToken">;

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

export type { Database } from "./generated/schema";
