alter table "public"."Device" alter column "registeredAt" set default now();

alter table "public"."Device" alter column "registeredAt" set data type timestamp with time zone using "registeredAt"::timestamp with time zone;

alter table "public"."Log" alter column "createdAt" set default now();

alter table "public"."Log" alter column "createdAt" set data type timestamp with time zone using "createdAt"::timestamp with time zone;

alter table "public"."Log" alter column "updatedAt" set default now();

alter table "public"."Log" alter column "updatedAt" set data type timestamp with time zone using "updatedAt"::timestamp with time zone;

alter table "public"."Sync" alter column "finishedAt" set data type timestamp with time zone using "finishedAt"::timestamp with time zone;

alter table "public"."Sync" alter column "startedAt" set default now();

alter table "public"."Sync" alter column "startedAt" set data type timestamp with time zone using "startedAt"::timestamp with time zone;

alter table "public"."UserFeed" alter column "lastSyncDate" set data type timestamp with time zone using "lastSyncDate"::timestamp with time zone;


