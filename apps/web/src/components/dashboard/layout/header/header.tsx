import { memo } from "react";

import { Logo } from "../../../ui/logo";

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
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-6 sm:px-8">
        <Logo withText={false} />
        <Navigation />
        <UserNavigation user={user} />
        <MobileNavigation user={user} />
      </div>
    </header>
  );
});

Header.displayName = "Header";
