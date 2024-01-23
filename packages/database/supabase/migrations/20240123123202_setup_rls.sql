alter table "public"."ApiKey" enable row level security;

alter table "public"."Article" enable row level security;

alter table "public"."Device" enable row level security;

alter table "public"."Feed" enable row level security;

alter table "public"."Log" enable row level security;

alter table "public"."Sync" enable row level security;

alter table "public"."UserFeed" alter column "startArticlesCount" set default 1;

alter table "public"."UserFeed" enable row level security;

create policy "Service can read all keys"
on "public"."ApiKey"
as permissive
for select
to service_role
using (true);


create policy "Authenticated users can read their own articles"
on "public"."Article"
as permissive
for select
to authenticated
using ((auth.uid() IN ( SELECT "Sync"."userId"
   FROM "Sync"
  WHERE ("Sync".id = "Article"."syncId"))));


create policy "Service can insert articles"
on "public"."Article"
as permissive
for insert
to service_role
with check (true);


create policy "Authenticated users can add devices"
on "public"."Device"
as permissive
for insert
to authenticated
with check (true);


create policy "Authenticated users can read their own devices"
on "public"."Device"
as permissive
for select
to authenticated
using ((auth.uid() = "userId"));


create policy "Authenticated users can remove their own devices"
on "public"."Device"
as permissive
for delete
to authenticated
using ((auth.uid() = "userId"));


create policy "Service can read all devices"
on "public"."Device"
as permissive
for select
to service_role
using (true);


create policy "Authenticated users can add feeds"
on "public"."Feed"
as permissive
for insert
to authenticated
with check (true);


create policy "Authenticated users can read their feeds"
on "public"."Feed"
as permissive
for select
to authenticated
using ((auth.uid() IN ( SELECT "UserFeed"."userId"
   FROM "UserFeed"
  WHERE ("UserFeed"."feedId" = "Feed".id))));


create policy "Authenticated users can remove their feeds"
on "public"."Feed"
as permissive
for delete
to authenticated
using ((auth.uid() IN ( SELECT "UserFeed"."userId"
   FROM "UserFeed"
  WHERE ("UserFeed"."feedId" = "Feed".id))));


create policy "Service can read all feeds"
on "public"."Feed"
as permissive
for select
to service_role
using (true);


create policy "Authenticated users can read their logs"
on "public"."Log"
as permissive
for select
to authenticated
using ((auth.uid() IN ( SELECT "Sync"."userId"
   FROM "Sync"
  WHERE ("Sync".id = "Log"."syncId"))));


create policy "Service can create logs"
on "public"."Log"
as permissive
for insert
to service_role
with check (true);


create policy "Service can update logs"
on "public"."Log"
as permissive
for update
to service_role
using (true)
with check (true);


create policy "Authenticated users can read their syncs"
on "public"."Sync"
as permissive
for select
to authenticated
using ((auth.uid() = "userId"));


create policy "Service can create syncs"
on "public"."Sync"
as permissive
for insert
to service_role
with check (true);


create policy "Service can update syncs"
on "public"."Sync"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Authenticated users can add feeds"
on "public"."UserFeed"
as permissive
for insert
to authenticated
with check (true);


create policy "Authenticated users can read their feeds"
on "public"."UserFeed"
as permissive
for select
to authenticated
using ((auth.uid() = "userId"));


create policy "Authenticated users can remove their feeds"
on "public"."UserFeed"
as permissive
for delete
to authenticated
using ((auth.uid() = "userId"));



