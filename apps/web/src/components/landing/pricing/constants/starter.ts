import { PricingPlanType } from "@syncreads/database";

import type { PricingPlanWithPrices } from "@/types/payment.types";

export const STARTER_PLAN: PricingPlanWithPrices = {
  id: "starter",
  name: "Starter",
  type: PricingPlanType.STARTER,
  order: 0,
  popular: false,
  description: "Start consuming now. No credit card required",
  prices: [
    {
      id: "starter-one-time",
      amount: 0,
      currency: "usd",
      recurring: null,
      type: "one_time",
    },
    {
      id: "starter-monthly",
      amount: 0,
      currency: "usd",
      recurring: {
        interval: "month",
        trialPeriodDays: null,
      },
      type: "recurring",
    },
    {
      id: "starter-yearly",
      amount: 0,
      currency: "usd",
      recurring: {
        interval: "year",
        trialPeriodDays: null,
      },
      type: "recurring",
    },
  ],
};
