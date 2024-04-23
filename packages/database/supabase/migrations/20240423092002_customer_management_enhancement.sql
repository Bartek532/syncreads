create type "public"."PricingPlanType" as enum ('STARTER', 'PREMIUM', 'UNLIMITED');

alter table "public"."Customer" add column "plan" "PricingPlanType";

alter table "public"."Customer" add column "status" "SubscriptionStatus";