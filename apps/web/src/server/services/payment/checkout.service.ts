import { ApiError } from "@syncreads/shared";

import { stripe } from "../../../lib/stripe/config";

import type Stripe from "stripe";

export const createCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams,
) => {
  try {
    return await stripe.checkout.sessions.create(params);
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not create checkout session.");
  }
};

export const getCheckoutSession = async (sessionId: string) => {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not retrieve checkout session.");
  }
};
