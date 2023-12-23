import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { MobileNavigation } from "./navigation/mobile-navigation";
import { Navigation } from "./navigation/navigation";
import { UserNavigation } from "./navigation/user-navigation";

import type { User } from "@rssmarkable/database";

type HeaderProps = {
  readonly user: User;
};

export const Header = memo<HeaderProps>(({ user }) => {
  return (
    <header className="h-16 w-full border-b bg-background">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-8">
        <Link className="flex flex-shrink-0 items-center" href="/">
          <Image
            src="/logo.png"
            width="28"
            height="36"
            alt="rssmarkable logo"
          />
        </Link>
        <Navigation />
        <UserNavigation user={user} />
        <MobileNavigation user={user} />
      </div>
    </header>
  );
});

Header.displayName = "Header";
