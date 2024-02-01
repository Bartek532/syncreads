import { NODE_ENV } from "@rssmarkable/shared";

import { env } from "../lib/env/client";

import type { DefaultToastOptions } from "react-hot-toast";

export const ORIGIN =
  env.NEXT_PUBLIC_HOST ??
  env.NEXT_PUBLIC_VERCEL_URL ??
  ("rssmarkable.com" as const);
export const PROTOCOL = env.NODE_ENV === NODE_ENV.PRODUCTION ? "https" : "http";
export const HOST = `${PROTOCOL}://${ORIGIN}` as const;
export const SITE_TITLE = "RSSmarkable";
export const SITE_TITLE_APPENDIX =
  "Seamlessly sync articles and feeds from the web.";
export const SITE_DESCRIPTION =
  "Say goodbye to your RSS reader. Sync your favorite content to selected device and read without distractions with just a few clicks.";
export const SEPARATOR = " | ";
export const SITE_TITLE_TEMPLATE = `%s${SEPARATOR}${SITE_TITLE}`;
export const SITE_IMAGE_URL = `/images/banner.png`;

export const GITHUB_URL = "https://github.com/Bartek532/rssmarkable";

export const LANDING_HEADER_NAVIGATION = [
  { name: "About", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const LANDING_FEATURES = {
  title: "See the magic",
  description: `Experience the features the users love.`,
  list: [
    {
      title: "Simple",
      description: `You need only 5 clicks to do full setup and sync your first article. Configure once, use forever.`,
    },
    {
      title: "Fast",
      description: `Average sync time is less than 5 seconds. We use the latest technologies to ensure your data is always up to date.`,
    },
    {
      title: "Reliable",
      description: `Downtime is not an option. It&apos;s our top priority to provide you the best possible experience.`,
    },
  ],
};

export const LANDING_REVIEWS = {
  title: "What our users say",
  description: `We are proud to have such a great community.`,
  quote: {
    content: `I love RSSmarkable. It's so easy to use and it works flawlessly. I can finally read my favorite articles without any fluff.`,
    author: {
      name: "Philipp",
      position: "Software Engineer",
      avatar: "/images/reviews/philipp.avif",
    },
  },
};

export const LANDING_FAQ = {
  title: "Frequently asked questions",
  questions: [
    {
      question: "What is RSSmarkable?",
      answer: `RSSmarkable is a service that allows you to sync content from the web to your favorite device.`,
    },
    {
      question: "How much does it cost?",
      answer: `It's completely free! We're thinking about adding a premium plan in the future with some extra features.`,
    },
    {
      question: "What can I sync?",
      answer: `You can sync almost any content from the web. We support also RSS feeds, which allows you to follow your favorites blogs and websites. Just drop a link and we'll do the rest.`,
    },
    {
      question: "How do I get started?",
      answer: `Create an account and connect your device. That's it!`,
    },
  ],
};

export const LANDING_CTA = {
  title: "Experience the workflow the users love.",
  button: "Register for free",
};

export const TOASTER_CONFIG: DefaultToastOptions = {
  style: {
    padding: "14px 25px",
    minWidth: "250px",
    gap: "10px",
    maxWidth: "400px",
  },
};

////////////////////////////////////

export const INDEX_FOOTER_NAVIGATION = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Sign in", href: "/auth/login" },
  { name: "Github", href: GITHUB_URL },
];

export const INDEX_HERO_SUBTITLE =
  "Sync all of your favorite RSS feeds directly to your reMarkable tablet with just a few clicks";

export const INDEX_FEATURES_HEADING = {
  title: "Features",
  description: `${SITE_TITLE} is a free service that allows you to sync content to your reMarkable tablet.`,
};

export const INDEX_FEATURES_CARDS = [
  {
    title: "Seamless Syncing",
    description: `Automatically sync your favorite RSS feeds to your reMarkable tablet. Add your favorite feeds and let ${SITE_TITLE} do the rest.`,
    className:
      "bg-gradient bg-gradient-to-bl from-indigo-400/10 to-indigo-500/30",
  },
  {
    title: "Add any RSS feed",
    description:
      "Any RSS feed can be synced to your reMarkable tablet. No restrictions",
    className:
      "bg-gradient bg-gradient-to-br from-indigo-400/5 to-indigo-500/20",
  },
  {
    title: "Add articles",
    description:
      "You can sync any article to your reMarkable tablet with just a few clicks.",
    className:
      "bg-gradient bg-gradient-to-tr from-indigo-400/5 to-indigo-500/20",
  },
];

export const INDEX_GET_STARTED_HEADING = {
  title: "Get started",
  description: `It's easy to get started with ${SITE_TITLE}`,
};

export const INDEX_GET_STARTED_STEPS = [
  { index: 1, title: "Create an account. It's free!" },
  { index: 2, title: "Connect your reMarkable account" },
  { index: 3, title: "Add your RSS feeds" },
];

export const INDEX_OPEN_SOURCE_HEADING = {
  title: "Open Source",
  description:
    "This project is open source and available on GitHub. Feel free to contribute!",
  cta: {
    text: "See on GitHub",
    href: GITHUB_URL,
  },
};
