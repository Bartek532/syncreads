import { ApiError } from "@syncreads/shared";

import { getCustomerByStripeId } from "../services/payment/customer.service";
import {
  getStripeSubscription,
  upsertCustomerSubscription,
} from "../services/payment/subscription.service";
import { toCustomerSubscription } from "../utils/mappers/subscription/toSubscription";

export const subscriptionStatusChangeHandler = async (
  subscriptionId: string,
  customerId: string,
  create = false,
) => {
  //   const { data, error, status } = await getCustomerByStripeId(customerId);
  //   if (error) {
  //     throw new ApiError(status, error.message);
  //   }

  //   const { id: uuid } = data;

  const subscription = await getStripeSubscription(subscriptionId);

  const {
    data: subscriptionData,
    error: subscriptionError,
    status: subscriptionStatus,
  } = await upsertCustomerSubscription(toCustomerSubscription(subscription));

  if (subscriptionError) {
    throw new ApiError(subscriptionStatus, subscriptionError.message);
  }

  console.log(subscriptionData);
};
