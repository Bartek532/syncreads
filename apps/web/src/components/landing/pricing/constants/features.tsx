import { PricingPlanType } from "@syncreads/database";
import { FEATURES } from "@syncreads/shared";
import { Chrome } from "lucide-react";

import { Badge } from "../../../ui/badge";

type PlanFeature = {
  readonly id: string;
  readonly title: string;
  readonly available: boolean;
  readonly addon?: React.ReactNode;
};

export const PLAN_FEATURES: Record<PricingPlanType, PlanFeature[]> = {
  [PricingPlanType.STARTER]: [
    {
      id: FEATURES.STARTER.SYNC,
      available: true,
      title: "Seamless sync",
    },
    {
      id: FEATURES.STARTER.BROWSER_EXTENSION,
      available: true,
      addon: <Chrome className="w-5" />,
      title: "Browser extension",
    },
    {
      id: FEATURES.STARTER.REMARKABLE_INTEGRATION,
      available: true,
      title: "reMarkable integration",
    },
    {
      id: FEATURES.STARTER.KINDLE_INTEGRATION,
      available: true,
      addon: <Badge variant="outline">New</Badge>,
      title: "Kindle integration",
    },
    {
      id: FEATURES.STARTER.MULTIPLE_FORMATS,
      available: true,
      title: "Multiple formats (pdf, epub)",
    },
    {
      id: FEATURES.STARTER.FEEDS_MANAGEMENT,
      available: true,
      title: "Feeds management",
    },
    {
      id: FEATURES.STARTER.REALTIME_TRACKING,
      available: true,
      title: "Realtime tracking (logs, history)",
    },
    {
      id: FEATURES.STARTER.SIMPLE_ANALYTICS,
      available: true,
      title: "Simple analytics",
    },
  ],
  [PricingPlanType.PREMIUM]: [
    {
      id: FEATURES.STARTER.SYNC,
      available: true,
      title: "Seamless sync",
    },
    {
      id: FEATURES.STARTER.BROWSER_EXTENSION,
      available: true,
      addon: <Chrome className="w-5" />,
      title: "Browser extension",
    },
    {
      id: FEATURES.STARTER.REMARKABLE_INTEGRATION,
      available: true,
      title: "reMarkable integration",
    },
    {
      id: FEATURES.STARTER.KINDLE_INTEGRATION,
      available: true,
      addon: <Badge variant="outline">New</Badge>,
      title: "Kindle integration",
    },
    {
      id: FEATURES.STARTER.MULTIPLE_FORMATS,
      available: true,
      title: "Multiple formats (pdf, epub)",
    },
    {
      id: FEATURES.STARTER.FEEDS_MANAGEMENT,
      available: true,
      title: "Feeds management",
    },
    {
      id: FEATURES.STARTER.REALTIME_TRACKING,
      available: true,
      title: "Realtime tracking (logs, history)",
    },
    {
      id: FEATURES.STARTER.SIMPLE_ANALYTICS,
      available: true,
      title: "Simple analytics",
    },
  ],
  [PricingPlanType.UNLIMITED]: [
    {
      id: FEATURES.STARTER.SYNC,
      available: true,
      title: "Seamless sync",
    },
    {
      id: FEATURES.STARTER.BROWSER_EXTENSION,
      available: true,
      addon: <Chrome className="w-5" />,
      title: "Browser extension",
    },
    {
      id: FEATURES.STARTER.REMARKABLE_INTEGRATION,
      available: true,
      title: "reMarkable integration",
    },
    {
      id: FEATURES.STARTER.KINDLE_INTEGRATION,
      available: true,
      addon: <Badge variant="outline">New</Badge>,
      title: "Kindle integration",
    },
    {
      id: FEATURES.STARTER.MULTIPLE_FORMATS,
      available: true,
      title: "Multiple formats (pdf, epub)",
    },
    {
      id: FEATURES.STARTER.FEEDS_MANAGEMENT,
      available: true,
      title: "Feeds management",
    },
    {
      id: FEATURES.STARTER.REALTIME_TRACKING,
      available: true,
      title: "Realtime tracking (logs, history)",
    },
    {
      id: FEATURES.STARTER.SIMPLE_ANALYTICS,
      available: true,
      title: "Simple analytics",
    },
  ],
};
