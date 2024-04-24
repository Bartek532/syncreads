import { stripe } from "@/lib/stripe/config";
import {
  toPricingPlan,
  toPricingPlanPrice,
} from "@/server/services/payment/mappers/toPricingPlan";
import type {
  PricingPlanPrice,
  PricingPlanWithPrices,
} from "@/types/payment.types";

import type Stripe from "stripe";

export const getStripeSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method", "plan.product"],
  }) as Promise<Stripe.Response<Stripe.Subscription & { plan: Stripe.Plan }>>;
};

export const getPricingPlans = async (params?: Stripe.PriceListParams) => {
  const prices = await stripe.prices.list({
    active: true,
    expand: ["data.product"],
    ...params,
  });

  const products = prices.data.reduce((acc, price) => {
    const product = price.product as Stripe.Product;

    if (!acc[product.id]) {
      acc[product.id] = {
        ...product,
        prices: [],
      };
    }

    acc[product.id]?.prices.push(toPricingPlanPrice(price));

    return acc;
  }, {} as Record<string, Stripe.Product & { prices: PricingPlanPrice[] }>);

  const filteredProducts = Object.values(products)
    .map((product) => ({
      ...toPricingPlan(product),
      prices: product.prices,
    }))
    .filter((x): x is PricingPlanWithPrices => !!x);

  return filteredProducts;
};
