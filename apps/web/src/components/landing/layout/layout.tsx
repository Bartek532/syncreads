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
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 pt-14 sm:px-8">
        {children}
      </main>
    </div>
  );
});

LandingLayout.displayName = "LandingLayout";
