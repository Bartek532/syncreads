import { PricingPlanType } from "@syncreads/database";
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
      id: "sync",
      available: true,
      title: "Seamless sync",
    },
    {
      id: "browser-extension",
      available: true,
      addon: <Chrome className="w-5" />,
      title: "Browser extension",
    },
    {
      id: "remarkable-integration",
      available: true,
      title: "reMarkable integration",
    },
    {
      id: "kindle-integration",
      available: true,
      addon: <Badge variant="outline">New</Badge>,
      title: "Kindle integration",
    },
    {
      id: "multiple-formats",
      available: true,
      title: "Multiple formats (pdf, epub)",
    },
    {
      id: "feeds-management",
      available: true,
      title: "Feeds management",
    },
    {
      id: "realtime-tracking",
      available: true,
      title: "Realtime tracking (logs, history)",
    },
    {
      id: "simple-analytics",
      available: true,
      title: "Simple analytics",
    },
  ],
  [PricingPlanType.PREMIUM]: [
    {
      id: "sync",
      available: true,
      title: "Seamless sync",
    },
    {
      id: "browser-extension",
      available: true,
      addon: <Chrome className="w-5" />,
      title: "Browser extension",
    },
    {
      id: "remarkable-integration",
      available: true,
      title: "reMarkable integration",
    },
    {
      id: "kindle-integration",
      available: true,
      addon: <Badge variant="outline">New</Badge>,
      title: "Kindle integration",
    },
    {
      id: "multiple-formats",
      available: true,
      title: "Multiple formats (pdf, epub)",
    },
    {
      id: "feeds-management",
      available: true,
      title: "Feeds management",
    },
    {
      id: "realtime-tracking",
      available: true,
      title: "Realtime tracking (logs, history)",
    },
    {
      id: "simple-analytics",
      available: true,
      title: "Simple analytics",
    },
  ],
  [PricingPlanType.UNLIMITED]: [
    {
      id: "sync",
      available: true,
      title: "Seamless sync",
    },
    {
      id: "browser-extension",
      available: true,
      addon: <Chrome className="w-5" />,
      title: "Browser extension",
    },
    {
      id: "remarkable-integration",
      available: true,
      title: "reMarkable integration",
    },
    {
      id: "kindle-integration",
      available: true,
      addon: <Badge variant="outline">New</Badge>,
      title: "Kindle integration",
    },
    {
      id: "multiple-formats",
      available: true,
      title: "Multiple formats (pdf, epub)",
    },
    {
      id: "feeds-management",
      available: true,
      title: "Feeds management",
    },
    {
      id: "realtime-tracking",
      available: true,
      title: "Realtime tracking (logs, history)",
    },
    {
      id: "simple-analytics",
      available: true,
      title: "Simple analytics",
    },
  ],
};
