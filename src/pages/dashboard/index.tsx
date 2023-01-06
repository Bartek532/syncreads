import { DashboardLayout } from "src/components/dashboard/layout/Layout";
import { HomeView } from "src/views/dashboard/Home";

import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <HomeView />
    </DashboardLayout>
  );
};

export default Dashboard;
