"use client";

import { Seo } from "../../components/common/Seo";
import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { HomeView } from "../../views/dashboard/Home";

const Dashboard = () => {
  return (
    <>
      <Seo title="Dashboard - Home" />
      <DashboardLayout>
        <HomeView />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
