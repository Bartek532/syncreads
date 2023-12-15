"use client";

import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DASHBOARD_NAVIGATION,
  DASHBOARD_SECONDARY_NAVIGATION,
} from "@/config/dashboard";
import { cn } from "@/utils";

export const MobileNavigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <button
        className="text-muted-foreground md:hidden"
        onClick={() => setIsNavOpen((t) => !t)}
      >
        <span className="sr-only">{isNavOpen ? "close" : "open"} menu</span>
        {isNavOpen ? <X /> : <AlignRight />}
      </button>

      <div
        className={cn(
          "fixed top-16 left-0 z-10 -mt-1 flex w-full flex-col gap-7 bg-background px-8 pt-2 pb-4 md:hidden",
          !isNavOpen && "hidden",
        )}
      >
        <Button variant="outline" className="w-full">
          Contact
        </Button>
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-muted-foreground">
            bartzagr@gmail.com
          </span>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
        <nav className="flex flex-col items-start">
          {DASHBOARD_NAVIGATION.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-full border-t py-3"
            >
              {link.name}
            </Link>
          ))}
          <button className="w-full border-y py-3 text-left">Log out</button>
        </nav>
        <h4 className="mt-4 text-lg font-medium">Configuration</h4>
        <nav className="-mt-2 flex flex-col items-start">
          {DASHBOARD_SECONDARY_NAVIGATION.map((link, index, arr) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "w-full border-t py-3",
                index === arr.length - 1 && "border-b",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
