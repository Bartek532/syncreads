import { ApiError } from "@syncreads/shared";

import type { PricingPlanPrice } from "@/types/payment.types";

import { supabase } from "../../lib/supabase/server";
import { createCheckoutSession } from "../services/payment/checkout.service";
import {
  createOrRetrieveCustomer,
  getCustomerByStripeId,
} from "../services/payment/customer.service";
import { getStripeSubscription } from "../services/payment/subscription.service";
import { calculateTrialEndUnixTimestamp } from "../utils/date";

export const subscriptionStatusChangeHandler = async (
  subscriptionId: string,
  customerId: string,
  create = false,
) => {
  const { data, error, status } = await getCustomerByStripeId(customerId);
  if (error) {
    throw new ApiError(status, error.message);
  }

  const { id: uuid } = data;

  const subscription = await getStripeSubscription(subscriptionId);

  // const {
  //   data: subscriptionData,
  //   error: subscriptionError,
  //   status: subscriptionStatus,
  // } = await upsertCustomerSubscription(toCustomerSubscription(subscription));

  // if (subscriptionError) {
  //   throw new ApiError(subscriptionStatus, subscriptionError.message);
  // }

  console.log(subscriptionData);
};

export const checkout = async (price: PricingPlanPrice) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase().auth.getUser();

    if (error || !user) {
      throw new ApiError(500, "Could not get user session.");
    }

    const customer = await createOrRetrieveCustomer({
      email: user.email ?? "",
      uuid: user.id,
    });

    const session = await createCheckoutSession({
      mode: "subscription",
      billing_address_collection: "required",
      customer,
      customer_update: {
        address: "auto",
      },
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      ...(price.type === "recurring"
        ? {
            subscription_data: {
              trial_end:
                calculateTrialEndUnixTimestamp(
                  price.recurring?.trialPeriodDays ?? 0,
                ) ?? 0,
            },
          }
        : {
            mode: "payment",
          }),
    });

    return session.id;
  } catch (e) {
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};
