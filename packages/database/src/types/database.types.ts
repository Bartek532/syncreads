import type { Database } from "./generated/schema";
import type { UserMetadata } from "@syncreads/shared";
import type { AuthSession, User as UserType } from "@supabase/supabase-js";

// Generics
type Tables<
  T extends keyof Database["public"]["Tables"],
  U extends keyof Database["public"]["Tables"][T] = "Row",
> = Database["public"]["Tables"][T][U];
type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type ApiKey = Tables<"ApiKey">;
export type InsertApiKey = Tables<"ApiKey", "Insert">;
export type UpdateApiKey = Tables<"ApiKey", "Update">;

export type Device = Tables<"Device">;
export type InsertDevice = Tables<"Device", "Insert">;
export type UpdateDevice = Tables<"Device", "Update">;

export type Feed = Tables<"Feed">;
export type InsertFeed = Tables<"Feed", "Insert">;
export type UpdateFeed = Tables<"Feed", "Update">;

export type Article = Tables<"Article">;
export type InsertArticle = Tables<"Article", "Insert">;
export type UpdateArticle = Tables<"Article", "Update">;

export type Log = Tables<"Log">;
export type InsertLog = Tables<"Log", "Insert">;
export type UpdateLog = Tables<"Log", "Update">;

export type Sync = Tables<"Sync">;
export type InsertSync = Tables<"Sync", "Insert">;
export type UpdateSync = Tables<"Sync", "Update">;

export type UserFeed = Tables<"UserFeed">;
export type InsertUserFeed = Tables<"UserFeed", "Insert">;
export type UpdateUserFeed = Tables<"UserFeed", "Update">;

export type SyncStatus = Enums<"SyncStatus">;
export type SyncTrigger = Enums<"SyncTrigger">;
export type DeviceType = Enums<"DeviceType">;

export const SyncStatus: { [K in SyncStatus]: K } = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  QUEUED: "QUEUED",
  IN_PROGRESS: "IN_PROGRESS",
  UNKNOWN: "UNKNOWN",
} as const;

export const SyncTrigger: { [K in SyncTrigger]: K } = {
  MANUAL: "MANUAL",
  SCHEDULE: "SCHEDULE",
} as const;

export const DeviceType: { [K in DeviceType]: K } = {
  REMARKABLE: "REMARKABLE",
  KINDLE: "KINDLE",
} as const;

// Auth
export type User = UserType & { user_metadata: Partial<UserMetadata> };
export type Session = AuthSession & { user: User };

export type { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
