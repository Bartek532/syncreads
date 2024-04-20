create type "public"."SubscriptionStatus" as enum ('ACTIVE', 'CANCELED', 'INCOMPLETE', 'INCOMPLETE_EXPIRED', 'PAST_DUE', 'PAUSED', 'TRIALING', 'UNPAID');

create table "public"."CustomerSubscription" (
    "id" text not null,
    "status" "SubscriptionStatus" not null,
    "customerId" uuid default gen_random_uuid()
);


alter table "public"."CustomerSubscription" enable row level security;

CREATE UNIQUE INDEX "CustomerSubscription_pkey" ON public."CustomerSubscription" USING btree (id);

alter table "public"."CustomerSubscription" add constraint "CustomerSubscription_pkey" PRIMARY KEY using index "CustomerSubscription_pkey";

alter table "public"."CustomerSubscription" add constraint "public_CustomerSubscription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."CustomerSubscription" validate constraint "public_CustomerSubscription_customerId_fkey";

grant delete on table "public"."CustomerSubscription" to "anon";

grant insert on table "public"."CustomerSubscription" to "anon";

grant references on table "public"."CustomerSubscription" to "anon";

grant select on table "public"."CustomerSubscription" to "anon";

grant trigger on table "public"."CustomerSubscription" to "anon";

grant truncate on table "public"."CustomerSubscription" to "anon";

grant update on table "public"."CustomerSubscription" to "anon";

grant delete on table "public"."CustomerSubscription" to "authenticated";

grant insert on table "public"."CustomerSubscription" to "authenticated";

grant references on table "public"."CustomerSubscription" to "authenticated";

grant select on table "public"."CustomerSubscription" to "authenticated";

grant trigger on table "public"."CustomerSubscription" to "authenticated";

grant truncate on table "public"."CustomerSubscription" to "authenticated";

grant update on table "public"."CustomerSubscription" to "authenticated";

grant delete on table "public"."CustomerSubscription" to "service_role";

grant insert on table "public"."CustomerSubscription" to "service_role";

grant references on table "public"."CustomerSubscription" to "service_role";

grant select on table "public"."CustomerSubscription" to "service_role";

grant trigger on table "public"."CustomerSubscription" to "service_role";

grant truncate on table "public"."CustomerSubscription" to "service_role";

grant update on table "public"."CustomerSubscription" to "service_role";


