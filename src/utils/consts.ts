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

export const PDF_OPTIONS = {
  format: "A4",
  margin: { top: 30, bottom: 30, left: 30, right: 30 },
  printBackground: true,
  timeout: 0,
} as const;

export const DASHBOARD_NAVIGATION = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Feeds",
    href: "/dashboard/feeds",
    icon: SquaresPlusIcon,
  },
  {
    name: "Device",
    href: "/dashboard/device",
    icon: CpuChipIcon,
  },
  {
    name: "Syncs",
    href: "/dashboard/syncs",
    icon: ArrowPathIcon,
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
