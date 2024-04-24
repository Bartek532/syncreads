import { ApiError } from "@syncreads/shared";

import { URL } from "@/config";
import { toPricingPlanType } from "@/server/services/payment/mappers/toPricingPlan";
import {
  toCheckoutSubscriptionStatus,
  toPaymentSubscriptionStatus,
  toSubscriptionStatus,
} from "@/server/services/payment/mappers/toSubscriptionStatus";
import type { PricingPlanPrice } from "@/types/payment.types";

import { supabase } from "../../lib/supabase/server";
import {
  createCheckoutSession,
  getCheckoutSession,
} from "../services/payment/checkout.service";
import {
  createOrRetrieveCustomer,
  getCustomerByStripeId,
  updateCustomer,
} from "../services/payment/customer.service";
import { getStripeSubscription } from "../services/payment/subscription.service";
import { calculateTrialEndUnixTimestamp } from "../utils/date";

import type Stripe from "stripe";

export const subscriptionStatusChangeHandler = async (
  subscriptionId: string,
  customerId: string,
) => {
  const { data, error, status } = await getCustomerByStripeId(customerId);
  if (error) {
    throw new ApiError(status, error.message);
  }

  if (!data) {
    throw new ApiError(404, "Customer not found.");
  }

  const subscription = await getStripeSubscription(subscriptionId);
  const product = subscription.plan.product as Stripe.Product;

  const { error: updateCustomerError, status: updateCustomerStatus } =
    await updateCustomer(data.userId, {
      status: toSubscriptionStatus(subscription.status),
      plan: toPricingPlanType(product.metadata.type),
    });

  if (updateCustomerError) {
    throw new ApiError(updateCustomerStatus, updateCustomerError.message);
  }
};

export const checkoutStatusChangeHandler = async (
  session: Stripe.Checkout.Session,
) => {
  const customerId = session.customer as string;

  if (session.mode === "subscription") {
    await subscriptionStatusChangeHandler(
      session.subscription as string,
      customerId,
    );
    return;
  }

  const { data, error, status } = await getCustomerByStripeId(customerId);
  if (error) {
    throw new ApiError(status, error.message);
  }

  if (!data) {
    throw new ApiError(404, "Customer not found.");
  }

  const checkoutSession = await getCheckoutSession(session.id);
  const product = checkoutSession.line_items?.data[0]?.price
    ?.product as Stripe.Product;

  const { error: updateCustomerError, status: updateCustomerStatus } =
    await updateCustomer(data.userId, {
      status: checkoutSession.status
        ? toCheckoutSubscriptionStatus(checkoutSession.status)
        : toPaymentSubscriptionStatus(checkoutSession.payment_status),
      plan: toPricingPlanType(product.metadata.type),
    });

  if (updateCustomerError) {
    throw new ApiError(updateCustomerStatus, updateCustomerError.message);
  }
};

export const checkout = async (
  price: PricingPlanPrice,
  redirectPath: string,
) => {
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

    const trialEnd = calculateTrialEndUnixTimestamp(
      price.recurring?.trialPeriodDays ?? 0,
    );

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
      success_url: `${URL}/dashboard/settings/billing`,
      cancel_url: `${URL}/${redirectPath}`,
      ...(price.type === "recurring"
        ? {
            ...(trialEnd
              ? {
                  subscription_data: {
                    trial_end: trialEnd,
                    trial_period_days: price.recurring?.trialPeriodDays ?? 0,
                  },
                }
              : {}),
          }
        : {
            mode: "payment",
          }),
    });

    return session.id;
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    }

    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};
