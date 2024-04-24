"use server";

import { GENERIC_ERROR_MESSAGE } from "@syncreads/shared";

import { checkout } from "@/server/controllers/payment.controller";
import type { PricingPlanPrice } from "@/types/payment.types";

export const checkoutUser = async (
  price: PricingPlanPrice,
  redirectPath: string,
) => {
  try {
    const sessionId = await checkout(price, redirectPath);
    return { sessionId, error: null } as const;
  } catch (e) {
    if (e instanceof Error) {
      return { sessionId: null, error: e.message } as const;
    }

    return { sessionId: null, error: GENERIC_ERROR_MESSAGE } as const;
  }
};
