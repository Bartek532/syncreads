alter table "public"."UserFeed" drop column "lastSyncDate";

alter table "public"."UserFeed" add column "createdAt" timestamp with time zone not null default now();

alter table "public"."UserFeed" add column "lastSyncedAt" timestamp with time zone;


