import { Hourglass, Newspaper, RefreshCw, Tablet } from "lucide-react";

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
  { name: "Profile", href: "/dashboard/settings/profile" },
  {
    name: "Appearance",
    href: "/dashboard/settings/appearance",
  },
];

export const DASHBOARD_CARDS = [
  {
    title: "Your feeds",
    href: "/dashboard/feeds",
    icon: Newspaper,
    link: "View feeds",
  },
  {
    title: "Saved time",
    href: "/dashboard/syncs",
    icon: Hourglass,
    link: "View syncs",
  },
  {
    title: "Total syncs",
    href: "/dashboard/syncs",
    icon: RefreshCw,
    link: "View syncs",
  },
  {
    title: "Your device",
    href: "/dashboard/device",
    icon: Tablet,
    link: "View details",
  },
];

export const DASHBOARD_SETTINGS_NAVIGATION = [
  { name: "Profile", href: "/dashboard/settings/profile" },
  { name: "Appearance", href: "/dashboard/settings/appearance" },
  { name: "Notifications", href: "/dashboard/settings/notifications" },
  { name: "Billing", href: "/dashboard/settings/billing" },
];

export enum PAGINATION_TYPE {
  OFFSET = "OFFSET",
  CURSOR = "CURSOR",
}
