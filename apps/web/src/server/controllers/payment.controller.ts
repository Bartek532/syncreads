import { ApiError } from "@syncreads/shared";

import { supabase } from "../../lib/supabase/client";
import { createCheckoutSession } from "../services/payment/checkout.service";
import {
  createOrRetrieveCustomer,
  getCustomerByStripeId,
} from "../services/payment/customer.service";
import { getStripeSubscription } from "../services/payment/subscription.service";
import { toCustomerSubscription } from "../utils/mappers/subscription/toSubscription";

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

const checkout = async () => {
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
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1JZ5ZzJZ5ZzJZ5ZzJZ5ZzJZ5",
          quantity: 1,
        },
      ],
      customer,
    });

    return session.id;
  } catch (e) {
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};
