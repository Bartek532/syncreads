export const SITE_NAME = "RSSmarkable";
export const GITHUB_URL = "https://github.com/Bartek532/rssmarkable";

export const INDEX_NAVIGATION = [
  { name: "Sign in", href: "/login" },
  { name: "Dashboard", href: "/dashboard" },
];

export const INDEX_FOOTER_NAVIGATION = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Sign in", href: "/login" },
  { name: "Github", href: GITHUB_URL },
];

export const INDEX_HERO_SUBTITLE =
  "Sync all of your favorite RSS feeds directly to your reMarkable tablet with just a few clicks";

export const INDEX_FEATURES_HEADING = {
  title: "Features",
  description: `${SITE_NAME} is a free service that allows you to sync content to your reMarkable tablet.`,
};

export const INDEX_FEATURES_CARDS = [
  {
    title: "Seamless Syncing",
    description: `Automatically sync your favorite RSS feeds to your reMarkable tablet. Add your favorite feeds and let ${SITE_NAME} do the rest.`,
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
  description: `It's easy to get started with ${SITE_NAME}`,
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

export const APP_NAME = "RSSmarkable";
export const APP_DESCRIPTION =
  "Sync all of your favourite RSS feeds directly to your reMarkable tablet with just a few clicks.";

export const TOASTER_CONFIG = {
  style: {
    padding: "14px 25px",
    minWidth: "250px",
    gap: "10px",
  },
  error: {
    style: {
      backgroundColor: "#fef2f2",
      color: "#991b1b",
    },
  },
  success: {
    style: {
      backgroundColor: "#f0fdf4",
      color: "#15803d",
    },
  },
};
