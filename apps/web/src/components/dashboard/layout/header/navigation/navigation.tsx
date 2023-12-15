"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { DASHBOARD_NAVIGATION } from "@/config/dashboard";
import { cn } from "@/utils";

export const Navigation = () => {
  const segment = useSelectedLayoutSegment();
  return (
    <nav className="mr-auto hidden items-center space-x-6 md:flex lg:space-x-8">
      {DASHBOARD_NAVIGATION.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            segment === link.segment && "text-primary",
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};
