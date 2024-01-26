drop policy "Authenticated users can read their feeds" on "public"."Feed";

create policy "Authenticated users can read all feeds"
on "public"."Feed"
as permissive
for select
to authenticated
using (true);

create policy "Authenticated users can read their keys"
on "public"."ApiKey"
as permissive
for select
to authenticated
using ((auth.uid() = "userId"));

