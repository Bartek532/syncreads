alter table "public"."Article" add column "syncedAt" timestamp with time zone not null default now();


