import { DashboardHome } from "../../components/dashboard/home/Home";

import type { PaginationParams } from "../../types/common.types";

const Dashboard = ({ searchParams }: { searchParams: PaginationParams }) => {
  return (
    <>
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
