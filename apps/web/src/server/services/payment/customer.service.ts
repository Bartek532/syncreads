import { stripe } from "@/lib/stripe/config";
import { supabase } from "@/lib/supabase/server";

export const getCustomerByStripeId = async (stripeId: string) => {
  return supabase()
    .from("Customer")
    .select("*")
    .eq("stripeId", stripeId)
    .single()
    .throwOnError();
};

export const upsertCustomer = async (uuid: string, stripeId: string) => {
  return supabase()
    .from("Customer")
    .upsert({ id: uuid, stripeId: stripeId })
    .throwOnError();
};

export const createStripeCustomer = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email };
  const newCustomer = await stripe.customers.create(customerData);

  if (!newCustomer) {
    throw new Error("Stripe customer creation failed.");
  }

  return newCustomer.id;
};

export const getStripeCustomerById = async (customerId: string) => {
  return stripe.customers.retrieve(customerId);
};

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email: email });

  return customers.data.length > 0 ? customers.data[0]?.id : null;
};
