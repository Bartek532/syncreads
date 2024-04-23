import type { PriceType, RecurringPriceInterval } from "@/types/payment.types";

export * from "./features";

export const PRICING_MODEL: PriceType = "one_time";
export const DEFAULT_SUBSCRIPTION_INTERVAL: RecurringPriceInterval = "month";
