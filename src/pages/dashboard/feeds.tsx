import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { FeedsView } from "../../views/dashboard/feeds/Feeds";

import type { NextPage } from "next";

const Feeds: NextPage = () => {
  return (
    <DashboardLayout>
      <FeedsView />
    </DashboardLayout>
  );
};

export default Feeds;
