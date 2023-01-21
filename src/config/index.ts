export const SITE_NAME = "RSSmarkable";

export const INDEX_NAVIGATION = [
  { name: "Sign in", href: "/login" },
  { name: "Github", href: "https://github.com/Bartek532/rssmarkable" },
];

export const INDEX_FOOTER_NAVIGATION = [
  { name: "Github", href: "https://github.com/Bartek532/rssmarkable" },
  { name: "Sign in", href: "/login" },
  { name: "Dashboard", href: "/dashboard" },
];

export const INDEX_HERO_SUBTITLE =
  "Sync all of your favorite RSS feeds directly to your reMarkable tablet with just a few clicks";

export const INDEX_FEATURES_HEADING = {
  title: "Features",
  description: `${SITE_NAME} is a free service that allows you to sync your reMarkable feeds`,
};

export const INDEX_FEATURES_CARDS = [
  {
    title: "Seamless Syncing",
    description:
      "Automatically sync your favorite RSS feeds to your reMarkable tablet",
    className:
      "bg-gradient bg-gradient-to-bl from-indigo-400/10 to-indigo-500/30",
  },
  {
    title: "Add any RSS feed",
    description:
      "Any RSS feed can be synced to your reMarkable tablet. No restrictions",
    className:
      "bg-gradient bg-gradient-to-bl from-indigo-400/5 to-indigo-500/20",
  },
];

export const INDEX_GET_STARTED_HEADING = {
  title: "Get started",
  description: `It's easy to get started with ${SITE_NAME}`,
};

export const INDEX_GET_STARTED_STEPS = [
  { index: 1, title: "Create an account. It's free!" },
  { index: 2, title: "Connect your reMarkable account" },
  { index: 3, title: "Add your RSS feeds" },
];
