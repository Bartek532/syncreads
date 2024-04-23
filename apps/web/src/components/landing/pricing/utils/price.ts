import type {
  PriceType,
  PricingPlanPrice,
  PricingPlanWithPrices,
  RecurringPriceInterval,
} from "@/types/payment.types";

export const getProductPrice = (
  product: PricingPlanWithPrices,
  model: PriceType,
  interval?: RecurringPriceInterval,
) => {
  if (model === "recurring" && interval) {
    return product.prices.find(
      (price) => price.recurring?.interval === interval,
    );
  }

  return product.prices.find((price) => price.type === model);
};

export const formatPrice = (price: PricingPlanPrice) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format(price.amount / 100);
};

export const calculateYearlyDiscount = (product: PricingPlanWithPrices) => {
  const monthlyPrice = getProductPrice(product, "recurring", "month");
  const yearlyPrice = getProductPrice(product, "recurring", "year");

  if (!monthlyPrice || !yearlyPrice) {
    return null;
  }

  const monthlyAmount = monthlyPrice.amount;
  const yearlyAmount = yearlyPrice.amount;

  return Math.round((1 - yearlyAmount / (monthlyAmount * 12)) * 100);
};
