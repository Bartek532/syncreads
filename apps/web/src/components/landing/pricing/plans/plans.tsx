import { memo } from "react";

import { DEFAULT_SUBSCRIPTION_INTERVAL } from "@/components/landing/pricing/constants";
import type {
  PricingPlanWithPrices,
  RecurringPriceInterval,
} from "@/types/payment.types";

import { Plan } from "./plan/plan";

type PlansProps = {
  readonly plans: PricingPlanWithPrices[];
  readonly interval?: RecurringPriceInterval;
};

export const Plans = memo<PlansProps>(
  ({ plans, interval = DEFAULT_SUBSCRIPTION_INTERVAL }) => {
    return (
      <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
        {plans.map((plan) => {
          return <Plan key={plan.id} plan={plan} interval={interval} />;
        })}
      </div>
    );
  },
);

Plans.displayName = "Plans";
