"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAvatar, getName } from "@/utils";

import { supabase } from "../../../../../lib/supabase/client";

import type { User } from "@rssmarkable/database";

type UserNavigationProps = {
  readonly user: User;
};

export const UserNavigation = memo<UserNavigationProps>(({ user }) => {
  const router = useRouter();
  const name = getName(user)?.split(" ");
  const initials = name?.map((n) => n[0]).join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative hidden items-center gap-4 rounded-md md:flex">
          <span className="text-sm">{name?.[0] ?? "Guest"}</span>
          <Avatar className="h-9 w-9">
            <AvatarImage src={getAvatar(user)} alt={name?.join(" ")} />
            <AvatarFallback>{initials ?? "👽"}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            {name && (
              <p className="text-sm font-medium leading-none">
                {name.join(" ")}
              </p>
            )}
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard/settings/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <button
            className="w-full"
            onClick={() => {
              router.push("/");
              toast.promise(supabase().auth.signOut(), {
                loading: "Logging out...",
                success: "Logged out successfully!",
                error: "Failed to log out!",
              });
            }}
          >
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserNavigation.displayName = "UserNavigation";
