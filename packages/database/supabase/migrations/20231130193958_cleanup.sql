alter table "public"."Account" drop constraint "Account_userId_fkey";

alter table "public"."Session" drop constraint "Session_userId_fkey";

alter table "public"."Device" drop constraint "Device_userId_fkey";

alter table "public"."Log" drop constraint "Log_syncId_fkey";

alter table "public"."Sync" drop constraint "Sync_userId_fkey";

alter table "public"."UserFeed" drop constraint "UserFeed_userId_fkey";

alter table "public"."Account" drop constraint "Account_pkey";

alter table "public"."Session" drop constraint "Session_pkey";

alter table "public"."User" drop constraint "User_pkey";

drop index if exists "public"."Account_pkey";

drop index if exists "public"."Account_provider_providerAccountId_key";

drop index if exists "public"."Device_userId_key";

drop index if exists "public"."Log_syncId_key";

drop index if exists "public"."Session_pkey";

drop index if exists "public"."Session_sessionToken_key";

drop index if exists "public"."UserFeed_userId_feedId_key";

drop index if exists "public"."User_email_key";

drop index if exists "public"."User_pkey";

drop index if exists "public"."VerificationToken_identifier_token_key";

drop index if exists "public"."VerificationToken_token_key";

drop table "public"."Account";

drop table "public"."Session";

drop table "public"."User";

drop table "public"."VerificationToken";

alter table "public"."Device" alter column "id" drop default;

alter table "public"."Device" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."Device" alter column "userId" set data type uuid using "userId"::uuid;

alter table "public"."Feed" alter column "id" drop default;

alter table "public"."Feed" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."Log" alter column "id" drop default;

alter table "public"."Log" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."Log" alter column "syncId" set data type uuid using "syncId"::uuid;

alter table "public"."Sync" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."Sync" alter column "userId" set data type uuid using "userId"::uuid;

alter table "public"."UserFeed" alter column "feedId" set data type uuid using "feedId"::uuid;

alter table "public"."UserFeed" alter column "userId" set data type uuid using "userId"::uuid;

drop sequence if exists "public"."Account_id_seq";

drop sequence if exists "public"."Device_id_seq";

drop sequence if exists "public"."Feed_id_seq";

drop sequence if exists "public"."Log_id_seq";

drop sequence if exists "public"."Session_id_seq";

drop sequence if exists "public"."User_id_seq";

alter table "public"."Device" add constraint "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Device" validate constraint "Device_userId_fkey";

alter table "public"."Log" add constraint "Log_syncId_fkey" FOREIGN KEY ("syncId") REFERENCES "Sync"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Log" validate constraint "Log_syncId_fkey";

alter table "public"."Sync" add constraint "Sync_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Sync" validate constraint "Sync_userId_fkey";

alter table "public"."UserFeed" add constraint "UserFeed_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."UserFeed" validate constraint "UserFeed_userId_fkey";


