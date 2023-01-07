import { DashboardLayout } from "src/components/dashboard/layout/Layout";
import { SyncsView } from "src/views/dashboard/syncs/Syncs";

import type { NextPage } from "next";

const Syncs: NextPage = () => {
  return (
    <DashboardLayout>
      <SyncsView />
    </DashboardLayout>
  );
};

export default Syncs;
