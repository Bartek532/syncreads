import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { SettingsView } from "../../views/dashboard/settings/Settings";

import type { NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <DashboardLayout>
      <SettingsView />
    </DashboardLayout>
  );
};

export default Settings;
