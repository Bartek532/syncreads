import { memo } from "react";

import { Header } from "./header/header";

import type { User } from "@rssmarkable/database";

interface LandingLayoutProps {
  readonly children: React.ReactNode;
  readonly user?: User;
}

export const LandingLayout = memo<LandingLayoutProps>(({ children, user }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header {...(user && { user })} />
      <main className="mx-auto grid w-full flex-1 grid-cols-[1fr_min(80rem,_100%)_1fr] px-6 pt-14 sm:px-8 [&>*]:col-[2]">
        {children}
      </main>
    </div>
  );
});

LandingLayout.displayName = "LandingLayout";
