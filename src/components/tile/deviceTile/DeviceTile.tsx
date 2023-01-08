import { memo } from "react";

import { onPromise } from "../../../utils/functions";

import type { Device } from "@prisma/client";

interface DeviceTileProps {
  readonly device: Device;
  readonly onDelete: () => Promise<void>;
}

export const DeviceTile = memo<DeviceTileProps>(({ device, onDelete }) => {
  return (
    <div>
      {device.token}
      <button onClick={onPromise(onDelete)}>Delete device</button>
    </div>
  );
});

DeviceTile.displayName = "DeviceTile";
