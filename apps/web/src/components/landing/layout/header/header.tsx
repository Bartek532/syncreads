import { memo } from "react";

import { Logo } from "../../../ui/logo";

import { MobileNavigation } from "./navigation/mobile-navigation";
import { Navigation } from "./navigation/navigation";

import type { User } from "@rssmarkable/database";

type HeaderProps = {
  readonly user?: User;
};

export const Header = memo<HeaderProps>(({ user }) => {
  return (
    <header className="fixed z-50 h-14 w-full bg-background md:h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-6 sm:px-8">
        <Logo />
        <Navigation {...(user && { user })} />
        <MobileNavigation />
      </div>
    </header>
  );
});

Header.displayName = "Header";
