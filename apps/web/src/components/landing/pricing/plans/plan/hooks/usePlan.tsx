import { PricingPlanType } from "@syncreads/database";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  PLAN_FEATURES,
  PRICING_MODEL,
  TRIAL_DURATION_DAYS,
  TRIAL_ON_PLANS,
} from "@/components/landing/pricing/constants";
import {
  checkoutUser,
  goToCustomerPortal,
} from "@/components/landing/pricing/plans/plan/actions";
import {
  calculateYearlyDiscount,
  getProductPrice,
} from "@/components/landing/pricing/utils/price";
import { getStripe } from "@/lib/stripe/client";
import type {
  PricingPlanWithPrices,
  RecurringPriceInterval,
} from "@/types/payment.types";

import type { Customer } from "@syncreads/database";
import type { User } from "@syncreads/shared";

type LoadingStatus = "trial" | "checkout" | "portal" | null;

export const usePlan = (
  plan: PricingPlanWithPrices,
  interval?: RecurringPriceInterval,
) => {
  const [loading, setLoading] = useState<LoadingStatus>(null);
  const router = useRouter();
  const pathname = usePathname();
  const price = getProductPrice(plan, PRICING_MODEL, interval);

  const features = plan.type in PLAN_FEATURES ? PLAN_FEATURES[plan.type] : null;
  const trial =
    PRICING_MODEL === "recurring" && TRIAL_ON_PLANS.includes(plan.type)
      ? TRIAL_DURATION_DAYS
      : undefined;

  const discount = interval === "year" ? calculateYearlyDiscount(plan) : null;

  const handleCheckout = async (user: User | null, trial?: number) => {
    setLoading(trial ? "trial" : "checkout");
    if (!user) {
      setLoading(null);
      return router.push("/auth/login");
    }

    if (!price) {
      setLoading(null);
      return;
    }

    const { sessionId, error } = await checkoutUser(price, pathname, trial);

    if (!sessionId) {
      setLoading(null);
      toast.error(error);
      return;
    }

    const stripe = await getStripe();
    await stripe?.redirectToCheckout({ sessionId });
    setLoading(null);
    return;
  };

  const handleOpenPortal = async (user: User | null) => {
    setLoading("portal");
    if (!user) {
      setLoading(null);
      return router.push("/auth/login");
    }

    const { url, error } = await goToCustomerPortal(pathname);

    if (!url) {
      setLoading(null);
      toast.error(error);
      return;
    }

    setLoading(null);
    router.push(url);
  };

  const hasPlan = (customer: Customer | null) => {
    if (!customer) {
      return false;
    }

    const currentPlanIndex = Object.values(PricingPlanType).indexOf(plan.type);
    const customerCurrentPlanIndex = customer.plan
      ? Object.values(PricingPlanType).indexOf(customer.plan)
      : -1;

    return currentPlanIndex <= customerCurrentPlanIndex;
  };

  return {
    loading,
    price,
    features,
    trial,
    discount,
    handleCheckout,
    handleOpenPortal,
    hasPlan,
  };
};
