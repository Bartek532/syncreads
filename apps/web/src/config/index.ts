import { DeviceType } from "@syncreads/database";
import {
  APP_NAME,
  APP_NAME_SEPARATOR,
  APP_ORIGIN,
  NODE_ENV,
} from "@syncreads/shared";

import { env } from "../lib/env/client";

import type { DefaultToastOptions } from "react-hot-toast";

export const ORIGIN =
  env.NEXT_PUBLIC_HOST ?? env.NEXT_PUBLIC_VERCEL_URL ?? APP_ORIGIN;
export const PROTOCOL = env.NODE_ENV === NODE_ENV.PRODUCTION ? "https" : "http";
export const URL = `${PROTOCOL}://${ORIGIN}` as const;
export const APP_NAME_TEMPLATE = `%s${APP_NAME_SEPARATOR}${APP_NAME}`;

export const APP_IMAGE = {
  light: "/images/banner/light.png",
  dark: "/images/banner/dark.png",
};

export const REPOSITORY_URL = "https://github.com/Bartek532/syncreads";
export const TWITTER_URL = "https://twitter.com/bzagrodzki";

export const LANDING_HEADER_NAVIGATION = [
  { name: "Explore", href: "/explore" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

export const LANDING_FEATURES = {
  title: {
    base: "See the",
    sparkling: "magic",
  },
  description: `Enjoy the features which make ${APP_NAME} great.`,
  list: [
    {
      title: "Simple",
      description: `You need only 5 clicks to do full setup and sync your first article. Configure once, use forever.`,
      image: {
        light: "/images/landing/features/light/simple.png",
        dark: "/images/landing/features/dark/simple.png",
      },
    },
    {
      title: "Fast",
      description: `Average sync time is less than 5 seconds. We use the latest technologies to ensure your data is always up to date.`,
      image: {
        light: "/images/landing/features/light/fast.png",
        dark: "/images/landing/features/dark/fast.png",
      },
    },
    {
      title: "Reliable",
      description: `Downtime is not an option. It's our top priority to provide you the best possible experience.`,
      image: {
        light: "/images/landing/features/light/reliable.png",
        dark: "/images/landing/features/dark/reliable.png",
      },
    },
  ],
};

export const LANDING_REVIEWS = {
  title: "What our users say",
  description: `We are proud to have such a great community.`,
  quote: {
    content: `I love ${APP_NAME}. It's so easy to use and it works flawlessly. I can finally read my favorite articles without any fluff.`,
    author: {
      name: "Philipp",
      position: "Software Engineer",
      avatar: "/images/landing/reviews/philipp.avif",
    },
  },
};

export const LANDING_FEEDBACK = {
  title: "Create the future together!",
  description: `We believe in transparency and the power of the community, so if you have any ideas or suggestions, feel free to give us a signal. We're open to any feedback!`,
  cta: {
    href: "/#contact",
    text: "Give feedback",
  },
};

export const LANDING_FAQ = {
  title: "Frequently asked questions",
  questions: [
    {
      question: `What is ${APP_NAME}?`,
      answer: `${APP_NAME} is a service that allows you to sync content from the web to your favorite device.`,
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
    {
      question: "Can I contribute?",
      answer: `Always! We're open to any feedback and ideas, just give us a shout and we'll figure something out.`,
    },
  ],
};

export const LANDING_CTA = {
  title: "Experience the workflow the users love.",
  button: "Register for free",
  pricing: "Discover plans",
};

export const LANDING_CONTACT = {
  title: "Contact",
  description: `If you have any questions or suggestions, please don't hesitate to drop us a message.`,
};

export const TOASTER_CONFIG: DefaultToastOptions = {
  className: "!bg-background !text-primary",
  style: {
    padding: "14px 25px",
    minWidth: "250px",
    gap: "10px",
    maxWidth: "400px",
  },
};

export const DEVICE_LABEL: Record<DeviceType, string> = {
  [DeviceType.KINDLE]: "Kindle",
  [DeviceType.REMARKABLE]: "reMarkable 2",
};
