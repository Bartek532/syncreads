"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";

import { DASHBOARD_SETTINGS_NAVIGATION } from "../../../../../config/dashboard";
import { buttonVariants } from "../../../../ui/button";

export const SettingsSidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 lg:flex-col lg:gap-1">
      {DASHBOARD_SETTINGS_NAVIGATION.map(({ href, name }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};
