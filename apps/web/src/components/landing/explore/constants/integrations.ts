import { LockIcon, RefreshCcw, RssIcon, TvIcon } from "lucide-react";

import { KINDLE_SETUP_STEPS } from "./setup/kindle";
import { REMARKABLE_SETUP_STEPS } from "./setup/remarkable";

export const INTEGRATIONS = {
  kindle: {
    id: "kindle",
    name: "Kindle",
    icon: "/images/landing/integrations/kindle/icon.png",
    description: "Best selling e-book reader in the world.",
    reviews: {
      rating: 4,
      total: 23,
      users: [
        {
          color: "bg-success-foreground",
          avatar: "/images/landing/integrations/kindle/reviews/1.png",
        },
        {
          color: "bg-sky-foreground",
          avatar: "/images/landing/integrations/kindle/reviews/2.png",
        },
        {
          color: "bg-warning-foreground",
          avatar: "/images/landing/integrations/kindle/reviews/3.png",
        },
      ],
    },
    setup: KINDLE_SETUP_STEPS,
  },
  remarkable: {
    id: "remarkable",
    name: "reMarkable",
    icon: "/images/landing/integrations/remarkable/icon.png",
    description: "The most advanced paper tablet.",
    reviews: {
      rating: 5,
      total: 56,
      users: [
        {
          color: "bg-picked/40",
          avatar: "/images/landing/integrations/remarkable/reviews/1.png",
        },
        {
          color: "bg-success-foreground",
          avatar: "/images/landing/integrations/remarkable/reviews/2.png",
        },
        {
          color: "bg-warning-foreground",
          avatar: "/images/landing/integrations/remarkable/reviews/3.png",
        },
        {
          color: "bg-sky-foreground",
          avatar: "/images/landing/integrations/remarkable/reviews/4.png",
        },
      ],
    },
    setup: REMARKABLE_SETUP_STEPS,
  },
  extension: {
    id: "extension",
    name: "Extension",
    icon: "/images/landing/integrations/extension/icon.png",
    description: "Just click and sync - directly from your browser.",
  },
};

export const FEATURES = [
  {
    title: "Seamless sync",
    description:
      "SyncReads enables you to sync ANYTHING from the web just by passing an url.",
    icon: RefreshCcw,
    image: {
      light: "/images/landing/integrations/features/sync/light.png",
      dark: "/images/landing/integrations/features/sync/dark.png",
    },
  },
  {
    title: "Feeds management",
    description:
      "Subscribe to your favorite feeds and get updates when you wish.",
    icon: RssIcon,
    image: {
      light: "/images/landing/integrations/features/feeds/light.png",
      dark: "/images/landing/integrations/features/feeds/dark.png",
    },
  },
  {
    title: "Realtime tracking",
    description:
      "Keep an eye on your syncs to see what's happening in real-time.",
    icon: TvIcon,
    image: {
      light: "/images/landing/integrations/features/realtime/light.png",
      dark: "/images/landing/integrations/features/realtime/dark.png",
    },
  },
  {
    title: "Privacy",
    description:
      "We take your privacy seriously - we DON'T modify any data on your behalf.",
    icon: LockIcon,
    image: {
      light: "/images/landing/integrations/features/privacy/light.png",
      dark: "/images/landing/integrations/features/privacy/dark.png",
    },
  },
];

export type Integration = keyof typeof INTEGRATIONS;
