import { memo } from "react";

import { Header } from "./header/header";

import type { User } from "@rssmarkable/database";

interface DashboardLayoutProps {
  readonly children: React.ReactNode;
  readonly user: User;
}

export const DashboardLayout = memo<DashboardLayoutProps>(
  ({ children, user }) => {
    return (
      <>
        <div className="min-h-screen bg-muted">
          <Header />
          <main className="mx-auto max-w-7xl flex-1 px-8 pt-12 pb-20">
            {children}
          </main>
        </div>
      </>
    );
  },
);

DashboardLayout.displayName = "DashboardLayout";
