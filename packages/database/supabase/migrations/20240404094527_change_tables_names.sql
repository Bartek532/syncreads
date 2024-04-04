drop policy "Authenticated users can read their keys" on "public"."ApiKey";

drop policy "Service can read all keys" on "public"."ApiKey";

drop policy "Authenticated users can read their own articles" on "public"."Article";

drop policy "Service can insert articles" on "public"."Article";

drop policy "Authenticated users can add devices" on "public"."Device";

drop policy "Authenticated users can read their own devices" on "public"."Device";

drop policy "Authenticated users can remove their own devices" on "public"."Device";

drop policy "Service can read all devices" on "public"."Device";

drop policy "Authenticated users can read their logs" on "public"."Log";

drop policy "Service can create logs" on "public"."Log";

drop policy "Service can update logs" on "public"."Log";

revoke delete on table "public"."ApiKey" from "anon";

revoke insert on table "public"."ApiKey" from "anon";

revoke references on table "public"."ApiKey" from "anon";

revoke select on table "public"."ApiKey" from "anon";

revoke trigger on table "public"."ApiKey" from "anon";

revoke truncate on table "public"."ApiKey" from "anon";

revoke update on table "public"."ApiKey" from "anon";

revoke delete on table "public"."ApiKey" from "authenticated";

revoke insert on table "public"."ApiKey" from "authenticated";

revoke references on table "public"."ApiKey" from "authenticated";

revoke select on table "public"."ApiKey" from "authenticated";

revoke trigger on table "public"."ApiKey" from "authenticated";

revoke truncate on table "public"."ApiKey" from "authenticated";

revoke update on table "public"."ApiKey" from "authenticated";

revoke delete on table "public"."ApiKey" from "service_role";

revoke insert on table "public"."ApiKey" from "service_role";

revoke references on table "public"."ApiKey" from "service_role";

revoke select on table "public"."ApiKey" from "service_role";

revoke trigger on table "public"."ApiKey" from "service_role";

revoke truncate on table "public"."ApiKey" from "service_role";

revoke update on table "public"."ApiKey" from "service_role";

revoke delete on table "public"."Article" from "anon";

revoke insert on table "public"."Article" from "anon";

revoke references on table "public"."Article" from "anon";

revoke select on table "public"."Article" from "anon";

revoke trigger on table "public"."Article" from "anon";

revoke truncate on table "public"."Article" from "anon";

revoke update on table "public"."Article" from "anon";

revoke delete on table "public"."Article" from "authenticated";

revoke insert on table "public"."Article" from "authenticated";

revoke references on table "public"."Article" from "authenticated";

revoke select on table "public"."Article" from "authenticated";

revoke trigger on table "public"."Article" from "authenticated";

revoke truncate on table "public"."Article" from "authenticated";

revoke update on table "public"."Article" from "authenticated";

revoke delete on table "public"."Article" from "service_role";

revoke insert on table "public"."Article" from "service_role";

revoke references on table "public"."Article" from "service_role";

revoke select on table "public"."Article" from "service_role";

revoke trigger on table "public"."Article" from "service_role";

revoke truncate on table "public"."Article" from "service_role";

revoke update on table "public"."Article" from "service_role";

revoke delete on table "public"."Device" from "anon";

revoke insert on table "public"."Device" from "anon";

revoke references on table "public"."Device" from "anon";

revoke select on table "public"."Device" from "anon";

revoke trigger on table "public"."Device" from "anon";

revoke truncate on table "public"."Device" from "anon";

revoke update on table "public"."Device" from "anon";

revoke delete on table "public"."Device" from "authenticated";

revoke insert on table "public"."Device" from "authenticated";

revoke references on table "public"."Device" from "authenticated";

revoke select on table "public"."Device" from "authenticated";

revoke trigger on table "public"."Device" from "authenticated";

revoke truncate on table "public"."Device" from "authenticated";

revoke update on table "public"."Device" from "authenticated";

revoke delete on table "public"."Device" from "service_role";

revoke insert on table "public"."Device" from "service_role";

revoke references on table "public"."Device" from "service_role";

revoke select on table "public"."Device" from "service_role";

revoke trigger on table "public"."Device" from "service_role";

revoke truncate on table "public"."Device" from "service_role";

revoke update on table "public"."Device" from "service_role";

revoke delete on table "public"."Log" from "anon";

revoke insert on table "public"."Log" from "anon";

revoke references on table "public"."Log" from "anon";

revoke select on table "public"."Log" from "anon";

revoke trigger on table "public"."Log" from "anon";

revoke truncate on table "public"."Log" from "anon";

revoke update on table "public"."Log" from "anon";

revoke delete on table "public"."Log" from "authenticated";

revoke insert on table "public"."Log" from "authenticated";

revoke references on table "public"."Log" from "authenticated";

revoke select on table "public"."Log" from "authenticated";

revoke trigger on table "public"."Log" from "authenticated";

revoke truncate on table "public"."Log" from "authenticated";

revoke update on table "public"."Log" from "authenticated";

revoke delete on table "public"."Log" from "service_role";

revoke insert on table "public"."Log" from "service_role";

revoke references on table "public"."Log" from "service_role";

revoke select on table "public"."Log" from "service_role";

revoke trigger on table "public"."Log" from "service_role";

revoke truncate on table "public"."Log" from "service_role";

revoke update on table "public"."Log" from "service_role";

alter table "public"."ApiKey" drop constraint "ApiKey_key_key";

alter table "public"."ApiKey" drop constraint "ApiKey_userId_fkey";

alter table "public"."Article" drop constraint "Article_syncId_fkey";

alter table "public"."Device" drop constraint "Device_userId_fkey";

alter table "public"."Log" drop constraint "Log_syncId_fkey";

alter table "public"."ApiKey" drop constraint "ApiKey_pkey";

alter table "public"."Article" drop constraint "Article_pkey";

alter table "public"."Device" drop constraint "Device_pkey";

alter table "public"."Log" drop constraint "Log_pkey";

drop index if exists "public"."ApiKey_key_key";

drop index if exists "public"."ApiKey_pkey";

drop index if exists "public"."Article_pkey";

drop index if exists "public"."Device_pkey";

drop index if exists "public"."Device_token_key";

drop index if exists "public"."Log_pkey";

drop table "public"."ApiKey";

drop table "public"."Article";

drop table "public"."Device";

drop table "public"."Log";

create table "public"."SyncArticle" (
    "syncId" uuid not null,
    "url" text not null,
    "syncedAt" timestamp with time zone not null default now()
);


alter table "public"."SyncArticle" enable row level security;

create table "public"."SyncLog" (
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now(),
    "json" jsonb not null,
    "syncId" uuid not null
);


alter table "public"."SyncLog" enable row level security;

create table "public"."UserApiKey" (
    "userId" uuid not null default auth.uid(),
    "key" text not null default gen_random_string(32),
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now()
);


alter table "public"."UserApiKey" enable row level security;

create table "public"."UserDevice" (
    "id" uuid not null default gen_random_uuid(),
    "token" text not null,
    "userId" uuid not null,
    "registeredAt" timestamp with time zone not null default now(),
    "type" "DeviceType" not null default 'REMARKABLE'::"DeviceType"
);


alter table "public"."UserDevice" enable row level security;

CREATE UNIQUE INDEX "ApiKey_key_key" ON public."UserApiKey" USING btree (key);

CREATE UNIQUE INDEX "ApiKey_pkey" ON public."UserApiKey" USING btree ("userId");

CREATE UNIQUE INDEX "Article_pkey" ON public."SyncArticle" USING btree ("syncId", url);

CREATE UNIQUE INDEX "Device_pkey" ON public."UserDevice" USING btree (id);

CREATE UNIQUE INDEX "Device_token_key" ON public."UserDevice" USING btree (token);

CREATE UNIQUE INDEX "Log_pkey" ON public."SyncLog" USING btree ("syncId");

alter table "public"."SyncArticle" add constraint "Article_pkey" PRIMARY KEY using index "Article_pkey";

alter table "public"."SyncLog" add constraint "Log_pkey" PRIMARY KEY using index "Log_pkey";

alter table "public"."UserApiKey" add constraint "ApiKey_pkey" PRIMARY KEY using index "ApiKey_pkey";

alter table "public"."UserDevice" add constraint "Device_pkey" PRIMARY KEY using index "Device_pkey";

alter table "public"."SyncArticle" add constraint "Article_syncId_fkey" FOREIGN KEY ("syncId") REFERENCES "Sync"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SyncArticle" validate constraint "Article_syncId_fkey";

alter table "public"."SyncLog" add constraint "Log_syncId_fkey" FOREIGN KEY ("syncId") REFERENCES "Sync"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SyncLog" validate constraint "Log_syncId_fkey";

alter table "public"."UserApiKey" add constraint "ApiKey_key_key" UNIQUE using index "ApiKey_key_key";

alter table "public"."UserApiKey" add constraint "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."UserApiKey" validate constraint "ApiKey_userId_fkey";

alter table "public"."UserDevice" add constraint "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."UserDevice" validate constraint "Device_userId_fkey";

grant delete on table "public"."SyncArticle" to "anon";

grant insert on table "public"."SyncArticle" to "anon";

grant references on table "public"."SyncArticle" to "anon";

grant select on table "public"."SyncArticle" to "anon";

grant trigger on table "public"."SyncArticle" to "anon";

grant truncate on table "public"."SyncArticle" to "anon";

grant update on table "public"."SyncArticle" to "anon";

grant delete on table "public"."SyncArticle" to "authenticated";

grant insert on table "public"."SyncArticle" to "authenticated";

grant references on table "public"."SyncArticle" to "authenticated";

grant select on table "public"."SyncArticle" to "authenticated";

grant trigger on table "public"."SyncArticle" to "authenticated";

grant truncate on table "public"."SyncArticle" to "authenticated";

grant update on table "public"."SyncArticle" to "authenticated";

grant delete on table "public"."SyncArticle" to "service_role";

grant insert on table "public"."SyncArticle" to "service_role";

grant references on table "public"."SyncArticle" to "service_role";

grant select on table "public"."SyncArticle" to "service_role";

grant trigger on table "public"."SyncArticle" to "service_role";

grant truncate on table "public"."SyncArticle" to "service_role";

grant update on table "public"."SyncArticle" to "service_role";

grant delete on table "public"."SyncLog" to "anon";

grant insert on table "public"."SyncLog" to "anon";

grant references on table "public"."SyncLog" to "anon";

grant select on table "public"."SyncLog" to "anon";

grant trigger on table "public"."SyncLog" to "anon";

grant truncate on table "public"."SyncLog" to "anon";

grant update on table "public"."SyncLog" to "anon";

grant delete on table "public"."SyncLog" to "authenticated";

grant insert on table "public"."SyncLog" to "authenticated";

grant references on table "public"."SyncLog" to "authenticated";

grant select on table "public"."SyncLog" to "authenticated";

grant trigger on table "public"."SyncLog" to "authenticated";

grant truncate on table "public"."SyncLog" to "authenticated";

grant update on table "public"."SyncLog" to "authenticated";

grant delete on table "public"."SyncLog" to "service_role";

grant insert on table "public"."SyncLog" to "service_role";

grant references on table "public"."SyncLog" to "service_role";

grant select on table "public"."SyncLog" to "service_role";

grant trigger on table "public"."SyncLog" to "service_role";

grant truncate on table "public"."SyncLog" to "service_role";

grant update on table "public"."SyncLog" to "service_role";

grant delete on table "public"."UserApiKey" to "anon";

grant insert on table "public"."UserApiKey" to "anon";

grant references on table "public"."UserApiKey" to "anon";

grant select on table "public"."UserApiKey" to "anon";

grant trigger on table "public"."UserApiKey" to "anon";

grant truncate on table "public"."UserApiKey" to "anon";

grant update on table "public"."UserApiKey" to "anon";

grant delete on table "public"."UserApiKey" to "authenticated";

grant insert on table "public"."UserApiKey" to "authenticated";

grant references on table "public"."UserApiKey" to "authenticated";

grant select on table "public"."UserApiKey" to "authenticated";

grant trigger on table "public"."UserApiKey" to "authenticated";

grant truncate on table "public"."UserApiKey" to "authenticated";

grant update on table "public"."UserApiKey" to "authenticated";

grant delete on table "public"."UserApiKey" to "service_role";

grant insert on table "public"."UserApiKey" to "service_role";

grant references on table "public"."UserApiKey" to "service_role";

grant select on table "public"."UserApiKey" to "service_role";

grant trigger on table "public"."UserApiKey" to "service_role";

grant truncate on table "public"."UserApiKey" to "service_role";

grant update on table "public"."UserApiKey" to "service_role";

grant delete on table "public"."UserDevice" to "anon";

grant insert on table "public"."UserDevice" to "anon";

grant references on table "public"."UserDevice" to "anon";

grant select on table "public"."UserDevice" to "anon";

grant trigger on table "public"."UserDevice" to "anon";

grant truncate on table "public"."UserDevice" to "anon";

grant update on table "public"."UserDevice" to "anon";

grant delete on table "public"."UserDevice" to "authenticated";

grant insert on table "public"."UserDevice" to "authenticated";

grant references on table "public"."UserDevice" to "authenticated";

grant select on table "public"."UserDevice" to "authenticated";

grant trigger on table "public"."UserDevice" to "authenticated";

grant truncate on table "public"."UserDevice" to "authenticated";

grant update on table "public"."UserDevice" to "authenticated";

grant delete on table "public"."UserDevice" to "service_role";

grant insert on table "public"."UserDevice" to "service_role";

grant references on table "public"."UserDevice" to "service_role";

grant select on table "public"."UserDevice" to "service_role";

grant trigger on table "public"."UserDevice" to "service_role";

grant truncate on table "public"."UserDevice" to "service_role";

grant update on table "public"."UserDevice" to "service_role";

create policy "Authenticated users can read their own articles"
on "public"."SyncArticle"
as permissive
for select
to authenticated
using ((auth.uid() IN ( SELECT "Sync"."userId"
   FROM "Sync"
  WHERE ("Sync".id = "SyncArticle"."syncId"))));


create policy "Service can insert articles"
on "public"."SyncArticle"
as permissive
for insert
to service_role
with check (true);


create policy "Authenticated users can read their logs"
on "public"."SyncLog"
as permissive
for select
to authenticated
using ((auth.uid() IN ( SELECT "Sync"."userId"
   FROM "Sync"
  WHERE ("Sync".id = "SyncLog"."syncId"))));


create policy "Service can create logs"
on "public"."SyncLog"
as permissive
for insert
to service_role
with check (true);


create policy "Service can update logs"
on "public"."SyncLog"
as permissive
for update
to service_role
using (true)
with check (true);


create policy "Authenticated users can read their keys"
on "public"."UserApiKey"
as permissive
for select
to authenticated
using ((auth.uid() = "userId"));


create policy "Service can read all keys"
on "public"."UserApiKey"
as permissive
for select
to service_role
using (true);


create policy "Authenticated users can add devices"
on "public"."UserDevice"
as permissive
for insert
to authenticated
with check (true);


create policy "Authenticated users can read their own devices"
on "public"."UserDevice"
as permissive
for select
to authenticated
using ((auth.uid() = "userId"));


create policy "Authenticated users can remove their own devices"
on "public"."UserDevice"
as permissive
for delete
to authenticated
using ((auth.uid() = "userId"));


create policy "Service can read all devices"
on "public"."UserDevice"
as permissive
for select
to service_role
using (true);



