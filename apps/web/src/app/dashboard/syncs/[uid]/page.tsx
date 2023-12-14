import { Seo } from "../../../../components/common/Seo";
import { DashboardLayout } from "../../../../components/dashboard/layout/Layoutx";
import { SyncView } from "../../../../views/dashboard/syncs/Sync";

const Sync = ({ params }: { params: { uid: string } }) => {
  return (
    <>
      <Seo title="Dashboard - Sync" />
      <DashboardLayout>
        <SyncView uid={params.uid} />
      </DashboardLayout>
    </>
  );
};

export default Sync;
