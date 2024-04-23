"use server";

import { checkout } from "@/server/controllers/payment.controller";
import type { PricingPlanPrice } from "@/types/payment.types";

export const checkoutUser = async (price: PricingPlanPrice) => {
  const sessionId = await checkout(price);
  return sessionId;
};
