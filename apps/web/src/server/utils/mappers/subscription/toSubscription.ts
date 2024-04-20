import { toSubscriptionStatus } from "./toSubscriptionStatus";

import type { InsertCustomerSubscription } from "@syncreads/database";
import type Stripe from "stripe";

export const toCustomerSubscription = (
  subscription: Stripe.Subscription,
): InsertCustomerSubscription => ({
  id: subscription.id,
  customerId: subscription.customer as string, // TODO: change to user id
  status: toSubscriptionStatus(subscription.status),
});
