import { memo } from "react";

import { Footer } from "./footer/footer";
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
      <main className="mx-auto grid w-full flex-1 grid-cols-[1fr_min(80rem,_calc(100%-3rem))_1fr] gap-x-6 pt-14 sm:grid-cols-[1fr_min(80rem,_calc(100%-4rem))_1fr] sm:gap-x-8 [&>*]:col-[2] [&>*]:scroll-mt-12 md:[&>*]:scroll-mt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
});

LandingLayout.displayName = "LandingLayout";
