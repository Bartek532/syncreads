"use client";

import { memo, useState } from "react";

import {
  DEFAULT_SUBSCRIPTION_INTERVAL,
  PRICING_MODEL,
} from "@/components/landing/pricing/constants";
import { Switch } from "@/components/ui/switch";
import type {
  PricingPlanWithPrices,
  RecurringPriceInterval,
} from "@/types/payment.types";

import { Plans } from "./plans/plans";

import type { Customer } from "@syncreads/database";
import type { User } from "@syncreads/shared";

type PricingProps = {
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly plans: PricingPlanWithPrices[];
};

export const Pricing = memo<PricingProps>(({ plans, user, customer }) => {
  const [billing, setBilling] = useState<RecurringPriceInterval>(
    DEFAULT_SUBSCRIPTION_INTERVAL,
  );

  return (
    <div className="flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
          What works for you?
        </h1>
        {PRICING_MODEL === "one_time" && (
          <p className="max-w-2xl text-center text-muted-foreground">
            Pay once. Use forever. <br />
            No recurring fees. No hidden charges.
          </p>
        )}

        {PRICING_MODEL === "recurring" && (
          <div className="mr-4 mt-6 flex items-center justify-center gap-3 lg:mt-8">
            <span>Monthly</span>
            <Switch
              checked={billing === "year"}
              onCheckedChange={(checked) =>
                setBilling(checked ? "year" : "month")
              }
            />
            <span>Yearly</span>
          </div>
        )}
      </header>
      <Plans plans={plans} interval={billing} user={user} customer={customer} />
    </div>
  );
});

Pricing.displayName = "Pricing";
