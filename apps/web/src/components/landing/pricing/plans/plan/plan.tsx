import { CheckIcon, Loader2, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useState } from "react";
import toast from "react-hot-toast";

import {
  DEFAULT_SUBSCRIPTION_INTERVAL,
  PLAN_FEATURES,
  PRICING_MODEL,
} from "@/components/landing/pricing/constants";
import {
  calculateYearlyDiscount,
  formatPrice,
  getProductPrice,
} from "@/components/landing/pricing/utils/price";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getStripe } from "@/lib/stripe/client";
import type {
  PricingPlanWithPrices,
  RecurringPriceInterval,
} from "@/types/payment.types";
import { cn, onPromise } from "@/utils";

import { checkoutUser } from "./actions";

import type { User } from "@syncreads/database";

type PlanProps = {
  readonly plan: PricingPlanWithPrices;
  readonly user: User | null;
  readonly interval?: RecurringPriceInterval;
};

export const Plan = memo<PlanProps>(
  ({ plan, interval = DEFAULT_SUBSCRIPTION_INTERVAL, user }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const price = getProductPrice(plan, PRICING_MODEL, interval);

    const features =
      plan.type in PLAN_FEATURES ? PLAN_FEATURES[plan.type] : null;

    if (!price || !features) {
      return null;
    }

    const discount = interval === "year" ? calculateYearlyDiscount(plan) : null;

    const handleCheckout = async () => {
      setLoading(true);
      if (!user) {
        setLoading(false);
        router.push("/auth/login");
      }

      const { sessionId, error } = await checkoutUser(price, pathname);

      if (!sessionId) {
        setLoading(false);
        toast.error(error);
        return;
      }

      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId });
      setLoading(false);
    };

    return (
      <div
        key={plan.name}
        className={cn(
          "grow-0 basis-[28rem] rounded-lg bg-gradient-to-br from-primary via-muted-foreground/50 to-primary/10 md:shrink-0",
          plan.popular ? "p-1 shadow-lg shadow-muted-foreground/60" : "shadow",
        )}
      >
        <Card className="relative flex flex-col gap-8 px-7 py-6 md:px-10 md:py-8">
          {plan.popular && (
            <Badge className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-6 py-2.5 hover:bg-primary">
              Most Popular
            </Badge>
          )}
          <div>
            <span className="text-lg font-bold">{plan.name}</span>
            <p className="relative flex items-end gap-1 py-1.5">
              <span className="text-4xl font-bold">{formatPrice(price)}</span>
              <span className="text-lg text-muted-foreground">
                / {!price.recurring ? "lifetime" : price.recurring.interval}
              </span>

              {!!discount && (
                <span className="-mt-1 ml-2 inline-block self-start rounded-lg bg-success-foreground px-2 py-0.5 text-sm text-success">
                  -{discount}%
                </span>
              )}
            </p>
            <span className="text-sm">{plan.description}</span>
          </div>

          <div className="flex flex-col gap-1">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3 py-1">
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full ",
                    feature.available ? "bg-primary" : "border border-primary",
                  )}
                >
                  {feature.available ? (
                    <CheckIcon className="w-3 text-primary-foreground" />
                  ) : (
                    <X className="w-3" />
                  )}
                </div>
                <span className="text-md">{feature.title}</span>
                {"addon" in feature && feature.addon}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {price.recurring?.trialPeriodDays && (
              <Button variant="outline">Start free trial</Button>
            )}
            {price.amount === 0 ? (
              <Link href="/auth/login" className={buttonVariants()}>
                Get started
              </Link>
            ) : (
              <Button
                onClick={onPromise(() => handleCheckout())}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Upgrade now"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  },
);

Plan.displayName = "Plan";
