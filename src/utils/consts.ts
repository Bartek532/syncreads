import { RssIcon } from "@heroicons/react/20/solid";
import {
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  DeviceTabletIcon,
  SquaresPlusIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

import { env } from "../env/server.mjs";

export const PDF_OPTIONS = {
  format: "A4",
  margin: { top: 30, bottom: 30, left: 30, right: 30 },
  printBackground: true,
} as const;

export const BROWSER_OPTIONS = {
  executablePath: env.CHROME_BIN,
  args: [
    // Required for Docker version of Puppeteer
    "--no-sandbox",
    "--disable-setuid-sandbox",
    // This will write shared memory files into /tmp instead of /dev/shm,
    // because Docker’s default for /dev/shm is 64MB
    "--disable-dev-shm-usage",
  ],
};

export const DASHBOARD_NAVIGATION = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  {
    name: "Feeds",
    href: "/dashboard/feeds",
    icon: SquaresPlusIcon,
    current: false,
  },
  {
    name: "Device",
    href: "/dashboard/device",
    icon: CpuChipIcon,
    current: false,
  },
  {
    name: "Syncs",
    href: "/dashboard/syncs",
    icon: ArrowPathIcon,
    current: false,
  },
];

export const DASHBOARD_SECONDARY_NAVIGATION = [
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
  { name: "Help", href: "/dashboard/help", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "/dashboard/privacy", icon: ShieldCheckIcon },
];

export const DASHBOARD_CARDS = [
  {
    title: "Your feeds",
    href: "/dashboard/feeds",
    icon: RssIcon,
    link: "View feeds",
  },
  {
    title: "Your device",
    href: "/dashboard/device",
    icon: DeviceTabletIcon,
    link: "View details",
  },
  {
    title: "Synced articles",
    href: "/dashboard/syncs",
    icon: ArrowPathIcon,
    link: "View syncs",
  },
];

export const TAILWIND_COLORS = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

export const TAILWIND_SATURATIONS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type TailwindColor = typeof TAILWIND_COLORS[number];
export type TailwindSaturation = typeof TAILWIND_SATURATIONS[number];
