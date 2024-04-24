import { PricingPlanType } from "@syncreads/database";

import type { PricingPlan, PricingPlanPrice } from "@/types/payment.types";

import type Stripe from "stripe";

export const toPricingPlanType = (
  input: string | undefined,
): PricingPlanType | null => {
  const type = Object.values(PricingPlanType).find((type) => type === input);

  if (!type) {
    return null;
  }

  return type;
};

export const toPricingPlan = (product: Stripe.Product): PricingPlan | null => {
  const type = toPricingPlanType(product.metadata.type);

  if (!type) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    type,
    order: product.metadata.order
      ? parseInt(product.metadata.order, 10)
      : 10000,
    popular: product.metadata.popular === "true",
    description: product.description,
  };
};

export const toPricingPlanPrice = (price: Stripe.Price): PricingPlanPrice => {
  return {
    id: price.id,
    amount: price.unit_amount ?? 0,
    currency: price.currency,
    type: price.type,
    recurring: price.recurring
      ? {
          interval: price.recurring.interval,
          trialPeriodDays: price.recurring.trial_period_days,
        }
      : null,
  };
};
