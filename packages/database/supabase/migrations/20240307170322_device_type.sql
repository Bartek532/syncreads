create type "public"."DeviceType" as enum ('KINDLE', 'REMARKABLE');

alter table "public"."Device" add column "type" "DeviceType" not null default 'REMARKABLE'::"DeviceType";