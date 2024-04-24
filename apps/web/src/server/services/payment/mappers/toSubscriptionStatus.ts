import { SubscriptionStatus } from "@syncreads/database";

export const toSubscriptionStatus = (status: string): SubscriptionStatus => {
  switch (status) {
    case "active":
      return SubscriptionStatus.ACTIVE;
    case "trialing":
      return SubscriptionStatus.TRIALING;
    case "past_due":
      return SubscriptionStatus.PAST_DUE;
    case "incomplete":
      return SubscriptionStatus.INCOMPLETE;
    case "incomplete_expired":
      return SubscriptionStatus.INCOMPLETE_EXPIRED;
    case "canceled":
      return SubscriptionStatus.CANCELED;
    case "unpaid":
      return SubscriptionStatus.UNPAID;
    case "paused":
      return SubscriptionStatus.PAUSED;

    default:
      throw new Error(`Invalid subscription status: ${status}`);
  }
};

export const toCheckoutSubscriptionStatus = (
  status: string,
): SubscriptionStatus => {
  switch (status) {
    case "open":
      return SubscriptionStatus.PAUSED;
    case "complete":
      return SubscriptionStatus.ACTIVE;
    case "expired":
      return SubscriptionStatus.CANCELED;
    default:
      throw new Error(`Invalid checkout subscription status: ${status}`);
  }
};

export const toPaymentSubscriptionStatus = (
  status: string,
): SubscriptionStatus => {
  switch (status) {
    case "paid":
      return SubscriptionStatus.ACTIVE;
    case "unpaid":
      return SubscriptionStatus.UNPAID;
    case "no_payment_required":
      return SubscriptionStatus.ACTIVE;
    default:
      throw new Error(`Invalid payment subscription status: ${status}`);
  }
};
