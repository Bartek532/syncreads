import { DashboardLayout } from "src/components/dashboard/layout/Layout";
import { DeviceView } from "src/views/dashboard/device/Device";

import type { NextPage } from "next";

const Device: NextPage = () => {
  return (
    <DashboardLayout>
      <DeviceView />
    </DashboardLayout>
  );
};

export default Device;
