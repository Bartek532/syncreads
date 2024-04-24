import { memo } from "react";

import { DEFAULT_SUBSCRIPTION_INTERVAL } from "@/components/landing/pricing/constants";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  PricingPlanWithPrices,
  RecurringPriceInterval,
} from "@/types/payment.types";

import { Plan } from "./plan/plan";

import type { Customer, User } from "@syncreads/database";

type PlansProps = {
  readonly plans: PricingPlanWithPrices[];
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly interval?: RecurringPriceInterval;
};

export const Plans = memo<PlansProps>(
  ({ plans, interval = DEFAULT_SUBSCRIPTION_INTERVAL, user, customer }) => {
    return (
      <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
        {plans.map((plan) => {
          return (
            <Plan
              key={plan.id}
              plan={plan}
              interval={interval}
              user={user}
              customer={customer}
            />
          );
        })}
      </div>
    );
  },
);

export const PlansSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grow-0 basis-[24rem] md:shrink-0">
          <Skeleton className="h-[32rem] w-full" />
        </div>
      ))}
    </div>
  );
};

Plans.displayName = "Plans";
