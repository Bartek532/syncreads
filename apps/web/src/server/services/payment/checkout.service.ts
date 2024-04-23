import { stripe } from "../../../lib/stripe/config";

import type Stripe from "stripe";

export const createCheckoutSession = (
  params: Stripe.Checkout.SessionCreateParams,
) => {
  return stripe.checkout.sessions.create(params);
};
