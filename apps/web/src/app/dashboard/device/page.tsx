import { api } from "../../../trpc/server";

import { Device } from "@/components/dashboard/device/Device";

const DevicePage = async () => {
  const device = await api.user.getUserDevice.query();

  return <Device device={device} />;
};

export default DevicePage;
