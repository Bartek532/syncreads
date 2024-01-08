import { memo } from "react";

import { SettingsSidebar } from "./sidebar/settings-sidebar";

type SettingsLayoutProps = {
  readonly children: React.ReactNode;
};

export const SettingsLayout = memo<SettingsLayoutProps>(({ children }) => {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col justify-start space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set preferences.
        </p>
      </div>
      <div className="-mx-6 flex flex-col gap-8 bg-background p-6 shadow-sm sm:mx-0 sm:rounded-lg lg:flex-row lg:gap-12">
        <aside className="lg:w-1/5">
          <SettingsSidebar />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
});

SettingsLayout.displayName = "SettingsLayout";
