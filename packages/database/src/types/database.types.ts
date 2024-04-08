import type { Database } from "./generated/schema";
import type { AuthSession, User as UserType } from "@supabase/supabase-js";
import type { UserMetadata } from "@syncreads/shared";

// Generics
type Tables<
  T extends keyof Database["public"]["Tables"],
  U extends keyof Database["public"]["Tables"][T] = "Row",
> = Database["public"]["Tables"][T][U];
type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type UserApiKey = Tables<"UserApiKey">;
export type InsertUserApiKey = Tables<"UserApiKey", "Insert">;
export type UpdateUserApiKey = Tables<"UserApiKey", "Update">;

export type UserDevice = Tables<"UserDevice">;
export type InsertUserDevice = Tables<"UserDevice", "Insert">;
export type UpdateUserDevice = Tables<"UserDevice", "Update">;

export type Feed = Tables<"Feed">;
export type InsertFeed = Tables<"Feed", "Insert">;
export type UpdateFeed = Tables<"Feed", "Update">;

export type SyncArticle = Tables<"SyncArticle">;
export type InsertSyncArticle = Tables<"SyncArticle", "Insert">;
export type UpdateSyncArticle = Tables<"SyncArticle", "Update">;

export type SyncLog = Tables<"SyncLog">;
export type InsertSyncLog = Tables<"SyncLog", "Insert">;
export type UpdateSyncLog = Tables<"SyncLog", "Update">;

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

export type {
  RealtimePostgresUpdatePayload,
  EmailOtpType,
} from "@supabase/supabase-js";
