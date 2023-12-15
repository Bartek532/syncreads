import { RssIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon, DeviceTabletIcon } from "@heroicons/react/24/outline";

import type { HeroIcon } from "../types/common.types";

export const DASHBOARD_NAVIGATION = [
  { name: "Home", href: "/dashboard", segment: null },
  {
    name: "Feeds",
    href: "/dashboard/feeds",
    segment: "feeds",
  },
  {
    name: "Device",
    href: "/dashboard/device",
    segment: "device",
  },
  {
    name: "Syncs",
    href: "/dashboard/syncs",
    segment: "syncs",
  },
];

export const DASHBOARD_SECONDARY_NAVIGATION = [
  { name: "Settings", href: "/dashboard/settings" },
  {
    name: "Help",
    href: "/dashboard/help",
  },
];

export const DASHBOARD_CARDS = [
  {
    title: "Your feeds",
    href: "/dashboard/feeds",
    icon: RssIcon as HeroIcon,
    link: "View feeds",
  },
  {
    title: "Your device",
    href: "/dashboard/device",
    icon: DeviceTabletIcon as HeroIcon,
    link: "View details",
  },
  {
    title: "Synced times",
    href: "/dashboard/syncs",
    icon: ArrowPathIcon as HeroIcon,
    link: "View syncs",
  },
];

export enum PAGINATION_TYPE {
  OFFSET = "OFFSET",
  CURSOR = "CURSOR",
}
