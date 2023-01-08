import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { DeviceView } from "../../views/dashboard/device/Device";

import type { NextPage } from "next";

const Device: NextPage = () => {
  return (
    <DashboardLayout>
      <DeviceView />
    </DashboardLayout>
  );
};

export default Device;
