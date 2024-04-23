"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  DEFAULT_SUBSCRIPTION_INTERVAL,
  PRICING_MODEL,
} from "@/components/landing/pricing/constants";
import { Switch } from "@/components/ui/switch";
import type { RecurringPriceInterval } from "@/types/payment.types";

export const PricingHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const billing = searchParams.get("billing") || DEFAULT_SUBSCRIPTION_INTERVAL;

  const setBilling = (billing: RecurringPriceInterval) => {
    router.push(`${pathname}?billing=${billing}`);
  };

  return (
    <header className="flex flex-col items-center justify-center gap-3">
      <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
        What works for you?
      </h1>
      {PRICING_MODEL === "one_time" && (
        <p className="max-w-2xl text-muted-foreground">
          Pay once. Use forever. No recurring fees. No hidden charges.
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
  );
};
