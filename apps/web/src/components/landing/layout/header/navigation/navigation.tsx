"use client";

import Link from "next/link";
import { memo } from "react";

import { LANDING_HEADER_NAVIGATION } from "../../../../../config";
import { buttonVariants } from "../../../../ui/button";

import type { User } from "@rssmarkable/database";

type NavigationProps = {
  readonly user?: User;
};

export const Navigation = memo<NavigationProps>(({ user }) => {
  return (
    <nav className="ml-auto hidden items-center space-x-6 md:flex lg:space-x-8">
      {LANDING_HEADER_NAVIGATION.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
