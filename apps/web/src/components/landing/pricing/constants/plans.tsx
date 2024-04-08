import { Chrome } from "lucide-react";

import { Badge } from "../../../ui/badge";

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: {
      month: 0,
      year: 0,
    },
    popular: true,
    trial: false,
    description: "Start consuming now. No credit card required",
    features: [
      {
        available: true,
        title: "Seamless sync",
      },
      {
        available: true,
        addon: <Chrome className="w-5" />,
        title: "Browser extension",
      },
      {
        available: true,
        title: "reMarkable integration",
      },
      {
        available: true,
        addon: <Badge variant="outline">New</Badge>,
        title: "Kindle integration",
      },
      {
        available: true,
        title: "Multiple formats (pdf, epub)",
      },
      {
        available: true,
        title: "Feeds management",
      },
      {
        available: true,
        title: "Realtime tracking (logs, history)",
      },
      {
        available: true,
        title: "Simple analytics",
      },
    ],
    cta: {
      title: "Get started",
      link: "/auth/register",
    },
  },
  // {
  //   name: "Pro",
  //   price: {
  //     month: 15,
  //     year: 109,
  //   },
  //   popular: true,
  //   trial: true,
  //   description: "For small teams and personal projects",
  //   features: [
  //     "Everything in Starter",
  //     "Custom Domain",
  //     "Advanced Functions",
  //     "Advanced Database",
  //     "Advanced Analytics",
  //     "Priority Support",
  //   ],
  // },
  // {
  //   name: "Enterprise",
  //   price: {
  //     month: 29,
  //     year: 309,
  //   },
  //   popular: false,
  //   trial: false,
  //   description: "For large teams and businesses",
  //   features: [
  //     "Everything in Pro",
  //     "Enterprise Functions",
  //     "Enterprise Database",
  //     "Enterprise Analytics",
  //     "SLA",
  //     "Dedicated Support",
  //   ],
  // },
];
