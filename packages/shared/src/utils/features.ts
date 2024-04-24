import { SubscriptionStatus } from "@syncreads/database";

import { FEATURES } from "../constants/features";

import type { Feature } from "../constants/features";
import type { Customer } from "@syncreads/database";

const ACTIVE_SUBSCRIPTION_STATUSES: SubscriptionStatus[] = [
  SubscriptionStatus.ACTIVE,
  SubscriptionStatus.TRIALING,
];

export const isFeatureAvailable = (
  customer: Pick<Customer, "plan" | "status">,
  feature: Feature,
) => {
  const plan = customer.plan;
  const status = customer.status;

  if (!plan || !status) {
    return false;
  }

  const isFeatureInPlan = Object.values(FEATURES[plan]).includes(feature);
  const isSubscriptionActive = ACTIVE_SUBSCRIPTION_STATUSES.includes(status);

  return isFeatureInPlan && isSubscriptionActive;
};
