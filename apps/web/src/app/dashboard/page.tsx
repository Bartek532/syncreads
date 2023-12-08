// import { Seo } from "../../components/common/Seo";
// import { DashboardLayout } from "../../components/dashboard/layout/Layout";
// import { HomeView } from "../../views/dashboard/Home";

import { DashboardHome } from "../../components/dashboard/home/Home";

import type { PaginationParams } from "../../types/common.types";

const Dashboard = ({ searchParams }: { searchParams: PaginationParams }) => {
  return (
    <>
      {/* <Seo title="Dashboard - Home" />
      <DashboardLayout>
        <HomeView />
      </DashboardLayout> */}
      <DashboardHome
        {...(!isNaN(Number(searchParams.page)) && {
          page: Number(searchParams.page),
        })}
        {...(!isNaN(Number(searchParams.perPage)) && {
          perPage: Number(searchParams.perPage),
        })}
      />
    </>
  );
};

export default Dashboard;
