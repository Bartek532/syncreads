"use server";

import { GENERIC_ERROR_MESSAGE } from "@syncreads/shared";

import {
  checkout,
  goToBillingPortal,
} from "@/server/controllers/payment.controller";
import type { PricingPlanPrice } from "@/types/payment.types";

export const checkoutUser = async (
  price: PricingPlanPrice,
  redirectPath: string,
  trial?: number,
) => {
  try {
    const sessionId = await checkout(price, redirectPath, trial);
    return { sessionId, error: null } as const;
  } catch (e) {
    if (e instanceof Error) {
      return { sessionId: null, error: e.message } as const;
    }

    return { sessionId: null, error: GENERIC_ERROR_MESSAGE } as const;
  }
};

export const goToCustomerPortal = async (currentPath: string) => {
  try {
    const url = await goToBillingPortal(currentPath);
    return { url, error: null } as const;
  } catch (e) {
    if (e instanceof Error) {
      return { url: null, error: e.message } as const;
    }

    return { url: null, error: GENERIC_ERROR_MESSAGE } as const;
  }
};
