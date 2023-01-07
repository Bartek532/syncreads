import { DashboardLayout } from "src/components/dashboard/layout/Layout";
import { FeedsView } from "src/views/dashboard/feeds/Feeds";

import type { NextPage } from "next";

const Feeds: NextPage = () => {
  return (
    <DashboardLayout>
      <FeedsView />
    </DashboardLayout>
  );
};

export default Feeds;
