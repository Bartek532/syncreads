import type { PricingPlanType } from "@syncreads/database";

export type PriceType = "one_time" | "recurring";
export type RecurringPriceInterval = "day" | "month" | "week" | "year";

export type PricingPlan = {
  readonly id: string;
  readonly order: number;
  readonly name: string;
  readonly type: PricingPlanType;
  readonly popular: boolean;
  readonly description: string | null;
};

export type PricingPlanPrice = {
  readonly id: string;
  readonly amount: number;
  readonly currency: string;
  readonly recurring: {
    readonly interval: RecurringPriceInterval;
    readonly trialPeriodDays: number | null;
  } | null;
  readonly type: PriceType;
};

export type PricingPlanWithPrices = PricingPlan & {
  readonly prices: PricingPlanPrice[];
};
