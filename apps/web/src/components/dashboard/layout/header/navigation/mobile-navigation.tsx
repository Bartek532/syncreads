"use client";

import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { toast } from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DASHBOARD_NAVIGATION,
  DASHBOARD_SECONDARY_NAVIGATION,
} from "@/config/dashboard";
import { supabase } from "@/lib/supabase/client";
import {
  cn,
  getAvatar,
  getName,
  lockScroll,
  onPromise,
  unlockScroll,
} from "@/utils";

import type { User } from "@rssmarkable/database";

type MobileNavigationProps = {
  readonly user: User;
};

export const MobileNavigation = memo<MobileNavigationProps>(({ user }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const name = getName(user)?.split(" ");
  const initials = name?.map((n) => n[0]).join("");
  const router = useRouter();

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
        <div className="flex w-full flex-col gap-7 bg-background px-6 pt-2 pb-10 sm:px-8">
          <Button variant="outline" className="w-full">
            Contact
          </Button>
          <div className="flex w-full items-center justify-between">
            {user.email && (
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            )}
            <Avatar className="h-9 w-9">
              <AvatarImage src={getAvatar(user)} alt={name?.join(" ")} />
              <AvatarFallback>{initials ?? "👽"}</AvatarFallback>
            </Avatar>
          </div>
          <nav className="flex flex-col items-start">
            {DASHBOARD_NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full border-t py-3"
                onClick={handleToggleNavigation}
              >
                {link.name}
              </Link>
            ))}
            <button
              className="w-full border-y py-3 text-left"
              onClick={onPromise(() =>
                toast.promise(supabase().auth.signOut(), {
                  loading: "Logging out...",
                  success: () => {
                    router.push("/");
                    router.refresh();
                    return "Logged out!";
                  },
                  error: "Failed to log out!",
                }),
              )}
            >
              Log out
            </button>
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
                onClick={handleToggleNavigation}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
});

MobileNavigation.displayName = "MobileNavigation";
