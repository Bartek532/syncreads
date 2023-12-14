import { AlignRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Navigation } from "./navigation/navigation";
import { UserNavigation } from "./user-navigation/user-navigation";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between gap-6 border-b py-3.5 px-6">
      <Link className="flex flex-shrink-0 items-center px-4" href="/">
        <Image src="/logo.png" width="28" height="36" alt="rssmarkable logo" />
      </Link>
      <Navigation className="mr-auto hidden md:flex" />
      <UserNavigation />
      <AlignRight className="text-muted-foreground" />
    </header>
  );
};
