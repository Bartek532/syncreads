"use client";

import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { memo, useState } from "react";

import { cn, lockScroll, unlockScroll } from "@/utils";

import { LANDING_HEADER_NAVIGATION } from "../../../../../config";
import { buttonVariants } from "../../../../ui/button";

import type { User } from "@rssmarkable/database";

type MobileNavigationProps = {
  readonly user?: User;
};

export const MobileNavigation = memo<MobileNavigationProps>(({ user }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNavigation = () => {
    isNavOpen ? unlockScroll() : lockScroll();
    setIsNavOpen((t) => !t);
  };

  return (
    <>
      <button className="md:hidden" onClick={handleToggleNavigation}>
        <span className="sr-only">{isNavOpen ? "close" : "open"} menu</span>
        {isNavOpen ? <X /> : <AlignRight />}
      </button>

      <div
        className={cn(
          "fixed top-14 left-0 z-10 -mt-1 flex h-[calc(100vh-3.25rem)] w-full flex-col gap-7 overflow-auto backdrop-blur-sm md:top-16 md:hidden md:h-[calc(100vh-3.75rem)]",
          !isNavOpen && "hidden",
        )}
      >
        <div className="flex w-full flex-col gap-7 bg-background px-6 pt-2 pb-8 sm:px-8">
          <nav className="flex flex-col items-start">
            {LANDING_HEADER_NAVIGATION.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full border-t py-3 first-of-type:border-none"
                onClick={handleToggleNavigation}
              >
                {link.name}
              </Link>
            ))}
            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-2 w-full",
              )}
              href="#contact"
              onClick={handleToggleNavigation}
            >
              Contact
            </Link>
            <Link
              className={cn(buttonVariants(), "mt-3 w-full")}
              href="#contact"
              onClick={handleToggleNavigation}
            >
              {user ? "Dashboard" : "Sync now!"}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
});

MobileNavigation.displayName = "MobileNavigation";
