import { Seo } from "../../components/common/Seo";
import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { SyncsView } from "../../views/dashboard/syncs/Syncs";

import type { NextPage } from "next";

const Syncs: NextPage = () => {
  return (
    <>
      <Seo title="Dashboard - Syncs" />
      <DashboardLayout>
        <SyncsView />
      </DashboardLayout>
    </>
  );
};

export default Syncs;
