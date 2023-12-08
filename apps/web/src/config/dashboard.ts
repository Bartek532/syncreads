import { RssIcon } from "@heroicons/react/20/solid";
import {
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  DeviceTabletIcon,
  SquaresPlusIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

import type { HeroIcon } from "../types/common.types";

export const DASHBOARD_NAVIGATION = [
  { name: "Home", href: "/dashboard", icon: HomeIcon as HeroIcon },
  {
    name: "Feeds",
    href: "/dashboard/feeds",
    icon: SquaresPlusIcon as HeroIcon,
  },
  {
    name: "Device",
    href: "/dashboard/device",
    icon: CpuChipIcon as HeroIcon,
  },
  {
    name: "Syncs",
    href: "/dashboard/syncs",
    icon: ArrowPathIcon as HeroIcon,
  },
];

export const DASHBOARD_SECONDARY_NAVIGATION = [
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon as HeroIcon },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: QuestionMarkCircleIcon as HeroIcon,
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
