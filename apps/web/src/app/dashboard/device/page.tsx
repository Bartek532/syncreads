import { Device } from "@/components/dashboard/device/device";

import { api } from "../../../trpc/server";

const DevicePage = async () => {
  const device = await api.user.getUserDevice.query();

  return <Device device={device} />;
};

export default DevicePage;
