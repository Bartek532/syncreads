import Image from "next/image";
import Link from "next/link";

import { MobileNavigation } from "./navigation/mobile-navigation";
import { Navigation } from "./navigation/navigation";
import { UserNavigation } from "./navigation/user-navigation";

export const Header = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between gap-8 border-b px-8">
      <Link className="flex flex-shrink-0 items-center" href="/">
        <Image src="/logo.png" width="28" height="36" alt="rssmarkable logo" />
      </Link>
      <Navigation />
      <UserNavigation />
      <MobileNavigation />
    </header>
  );
};
