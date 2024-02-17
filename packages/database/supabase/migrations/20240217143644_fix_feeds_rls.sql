drop policy "Authenticated users can read their feeds" on "public"."UserFeed";

create policy "Authenticated users can read feeds"
on "public"."UserFeed"
as permissive
for select
to authenticated
using (true);



