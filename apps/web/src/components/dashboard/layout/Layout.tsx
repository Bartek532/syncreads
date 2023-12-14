import { memo } from "react";

import { Header } from "./header/header";
import { Navigation } from "./header/navigation/navigation";

import type { User } from "@rssmarkable/database";

interface DashboardLayoutProps {
  readonly children: React.ReactNode;
  readonly user: User;
}

export const DashboardLayout = memo<DashboardLayoutProps>(
  ({ children, user }) => {
    return (
      <>
        <div className="min-h-screen">
          <Header />

          <div className="flex flex-1 flex-col lg:pl-64">
            {/* <Header user={user} onSidebarOpen={() => setIsSidebarOpen(true)} /> */}
            {/* <main className="flex-1 pb-8 ">{children}</main> */}
          </div>
        </div>
      </>
    );
  },
);

DashboardLayout.displayName = "DashboardLayout";
