import { APP_NAME } from "@syncreads/shared";
import {
  ChromeIcon,
  LockIcon,
  RefreshCcw,
  RssIcon,
  TvIcon,
} from "lucide-react";

import { KINDLE_SETUP_STEPS } from "./setup/kindle";
import { REMARKABLE_SETUP_STEPS } from "./setup/remarkable";

export const INTEGRATIONS = {
  kindle: {
    id: "kindle",
    name: "Kindle",
    icon: "/images/landing/integrations/kindle/icon.png",
    description: "Best selling e-book reader in the world.",
    hero: {
      title: `Connect your Kindle to ${APP_NAME}`,
      description:
        "Stop losing your highlights and focus. Organize everything in one place, without any distractions.",
      image: {
        light: "/images/landing/integrations/kindle/hero/light.png",
        dark: "/images/landing/integrations/kindle/hero/dark.png",
      },
    },
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
    quote: "I will never come back to Send to Kindle.",
    spacer: {
      title: "50,000,000",
      description: "Kindle devices sold worldwide",
    },
    setup: KINDLE_SETUP_STEPS,
  },
  remarkable: {
    id: "remarkable",
    name: "reMarkable",
    icon: "/images/landing/integrations/remarkable/icon.png",
    description: "The most advanced paper tablet.",
    hero: {
      title: `Make reMarkable truly remarkable`,
      description:
        "No more manual work - everything synced automatically. Focus on consuming and leave the rest to us.",
      image: {
        light: "/images/landing/integrations/remarkable/hero/light.png",
        dark: "/images/landing/integrations/remarkable/hero/dark.png",
      },
    },
    spacer: "/images/landing/integrations/remarkable/banner.png",
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
    quote: {
      content: "Very easy to set up and use. Click click and it's on your rM.",
      author: {
        name: "Evon Smith",
        role: "reMarkable 2 user",
      },
    },
    setup: REMARKABLE_SETUP_STEPS,
  },
  extension: {
    id: "extension",
    name: "Extension",
    icon: "/images/landing/integrations/extension/icon.png",
    description: "Just click and sync - directly from your browser.",
    hero: {
      title: "Click & Sync",
      description:
        "The browser extension allows you to sync articles from your favorite websites with a single click.",
    },
    stores: [
      {
        id: "chrome",
        icon: ChromeIcon,
        cta: "Install in Chrome",
        link: "https://chromewebstore.google.com/detail/syncreads-consume-the-web/cblhanehfpljakpeihpepdehkchpafig",
      },
    ],
    features: [
      {
        id: "click-sync",
        title: "Save it with one click",
        description: `Just hit the ${APP_NAME} logo to save any page you're on.`,
        image: {
          dark: "/images/landing/integrations/extension/features/click-sync/dark.png",
          light:
            "/images/landing/integrations/extension/features/click-sync/light.png",
        },
      },
      {
        id: "realtime",
        title: "Track in realtime",
        description: "Make sure that everything is on the right track.",
        image: {
          dark: "/images/landing/integrations/extension/features/realtime/dark.png",
          light:
            "/images/landing/integrations/extension/features/realtime/light.png",
        },
      },
      {
        id: "organize",
        title: "Stay organized",
        description: "Organize your syncs to keep everything in order.",
        image: {
          dark: "/images/landing/integrations/extension/features/organize/dark.png",
          light:
            "/images/landing/integrations/extension/features/organize/light.png",
        },
      },
      {
        id: "privacy",
        title: "Keep it private",
        description:
          "Extension is linked only to your account - no data is stored locally.",
        image: {
          dark: "/images/landing/integrations/extension/features/privacy/dark.png",
          light:
            "/images/landing/integrations/extension/features/privacy/light.png",
        },
      },
    ],
    alternatives: [
      {
        id: "syncreads",
        name: APP_NAME,
        success: true,
      },
      {
        id: "kindle",
        name: "Send to Kindle",
        success: false,
      },
      {
        id: "remarkable",
        name: "Read on reMarkable",
        success: false,
      },
    ],
    web: {
      title: "Put the whole web into your pocket",
      description: `${APP_NAME} supports the internet's top sites.`,
      image: "/images/landing/integrations/extension/web/image.png",
      more: "And more...",
      sites: [
        {
          name: "Wikipedia",
          icon: "/images/landing/integrations/extension/web/sites/wikipedia.png",
        },
        {
          name: "NYT",
          icon: "/images/landing/integrations/extension/web/sites/nyt.png",
        },
        {
          name: "Google",
          icon: "/images/landing/integrations/extension/web/sites/google.png",
        },
        {
          name: "X",
          icon: "/images/landing/integrations/extension/web/sites/x.png",
        },
      ],
    },
  },
};

export const FEATURES = [
  {
    id: "sync",
    title: "Seamless sync",
    description: `${APP_NAME} enables you to sync ANYTHING from the web just by passing an url.`,
    icon: RefreshCcw,
    image: {
      light: "/images/landing/integrations/features/sync/light.png",
      dark: "/images/landing/integrations/features/sync/dark.png",
    },
  },
  {
    id: "feeds",
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
    id: "realtime",
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
    id: "privacy",
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
