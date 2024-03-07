create type "public"."DeviceType" as enum ('KINDLE', 'REMARKABLE_2');

alter table "public"."Device" add column "type" "DeviceType" not null default 'REMARKABLE_2'::"DeviceType";


