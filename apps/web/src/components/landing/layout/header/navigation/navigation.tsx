"use client";

import Link from "next/link";
import { memo } from "react";

import { useVisibleSection } from "@/hooks/useVisibleSection";
import { cn } from "@/utils";

import { LANDING_HEADER_NAVIGATION } from "../../../../../config";
import { buttonVariants } from "../../../../ui/button";

import type { User } from "@syncreads/database";

type NavigationProps = {
  readonly user?: User;
};

export const Navigation = memo<NavigationProps>(({ user }) => {
  const visibleSection = useVisibleSection();

  return (
    <nav className="ml-auto hidden items-center space-x-6 md:flex lg:space-x-8">
      {LANDING_HEADER_NAVIGATION.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            `#${visibleSection}` === link.href
              ? "text-primary"
              : "text-muted-foreground",
          )}
        >
          {link.name}
        </Link>
      ))}
      <Link
        className={buttonVariants()}
        href={user ? "/dashboard" : "/auth/login"}
      >
        {user ? "Dashboard" : "Sync now!"}
      </Link>
    </nav>
  );
});

Navigation.displayName = "Navigation";
