import { Device } from "@/components/dashboard/device/device";

import { getMetadata } from "../../../lib/metadata";
import { api } from "../../../trpc/server";

export const metadata = getMetadata({
  title: "Device",
});

const DevicePage = async () => {
  const device = await api.user.getUserDevice.query();

  return <Device device={device} />;
};

export default DevicePage;
