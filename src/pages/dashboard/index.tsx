import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { HomeView } from "../../views/dashboard/Home";

import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <HomeView />
    </DashboardLayout>
  );
};

export default Dashboard;
