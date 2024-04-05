alter table "public"."Feed" alter column "site" set not null;

alter table "public"."Sync" add column "deviceId" uuid;

alter table "public"."Sync" add constraint "public_Sync_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "UserDevice"(id) ON DELETE SET NULL not valid;

alter table "public"."Sync" validate constraint "public_Sync_deviceId_fkey";
