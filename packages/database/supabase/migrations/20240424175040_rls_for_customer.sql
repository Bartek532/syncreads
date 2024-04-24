create policy "Authenticated users can read their customer data"
on "public"."Customer"
as permissive
for select
to authenticated
using (true);


create policy "Service can add new customer"
on "public"."Customer"
as permissive
for insert
to service_role
with check (true);


create policy "Service can read all customers"
on "public"."Customer"
as permissive
for select
to service_role
using (true);


create policy "Service can update customers"
on "public"."Customer"
as permissive
for update
to service_role
using (true);



