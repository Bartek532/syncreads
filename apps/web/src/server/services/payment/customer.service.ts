import { ApiError } from "@syncreads/shared";

import { stripe } from "@/lib/stripe/config";
import { supabase } from "@/lib/supabase/server";

import type { InsertCustomer, UpdateCustomer } from "@syncreads/database";
import type Stripe from "stripe";

export const getCustomerById = async (userId: string) => {
  return supabase()
    .from("Customer")
    .select("*")
    .eq("userId", userId)
    .maybeSingle();
};

export const getCustomerByStripeId = async (stripeId: string) => {
  return supabase()
    .from("Customer")
    .select("*")
    .eq("customerId", stripeId)
    .maybeSingle();
};

export const upsertCustomer = async (data: InsertCustomer) => {
  return supabase().from("Customer").upsert(data).throwOnError();
};

export const updateCustomer = async (id: string, data: UpdateCustomer) => {
  return supabase()
    .from("Customer")
    .update(data)
    .eq("userId", id)
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

  return customers.data.length > 0 ? customers.data[0] : null;
};

export const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const {
    data: existingCustomer,
    error: existingCustomerError,
    status: existingCustomerStatus,
  } = await getCustomerById(uuid);

  if (existingCustomerError) {
    throw new ApiError(existingCustomerStatus, existingCustomerError.message);
  }

  const stripeCustomerId = existingCustomer?.customerId
    ? (await getStripeCustomerById(existingCustomer.customerId)).id
    : (await getStripeCustomerByEmail(email))?.id;

  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await createStripeCustomer(uuid, email);

  if (!stripeIdToInsert) {
    throw new ApiError(500, "Stripe customer creation failed.");
  }

  if (existingCustomer && stripeCustomerId) {
    if (existingCustomer.customerId !== stripeCustomerId) {
      await updateCustomer(uuid, { customerId: stripeCustomerId });
      console.warn(
        `Customer ${uuid} had a different stripeId. Updated to ${stripeCustomerId}.`,
      );
    }

    return stripeCustomerId;
  }

  const { error: newCustomerError, status } = await upsertCustomer({
    userId: uuid,
    customerId: stripeIdToInsert,
  });

  if (newCustomerError) {
    throw new ApiError(status, newCustomerError.message);
  }

  return stripeIdToInsert;
};

export const createBillingPortalSession = async (
  params: Stripe.BillingPortal.SessionCreateParams,
) => {
  try {
    return await stripe.billingPortal.sessions.create(params);
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not create billing portal session.");
  }
};
