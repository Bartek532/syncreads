import { stripe } from "@/lib/stripe/config";
import { supabase } from "@/lib/supabase/server";

import type { InsertCustomerSubscription } from "@syncreads/database";

export const getStripeSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });
};

export const upsertCustomerSubscription = async (
  data: InsertCustomerSubscription,
) => {
  return supabase().from("CustomerSubscription").upsert(data).throwOnError();
};
