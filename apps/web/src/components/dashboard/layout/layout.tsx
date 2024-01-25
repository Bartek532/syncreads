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
          <Header user={user} />
          <main className="mx-auto max-w-7xl flex-1 px-6 pt-12 pb-20 sm:px-8">
            {children}
          </main>
        </div>
      </>
    );
  },
);

DashboardLayout.displayName = "DashboardLayout";
