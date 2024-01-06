"use client";

import { memo } from "react";

import EmptyDeviceIcon from "public/svg/empty-device.svg";

import { Empty } from "../../ui/empty";

import { AddDeviceDialog } from "./dialog/add-device-dialog";
import { DeviceTile } from "./tile/device-tile";

import type { Device as DeviceType } from "@rssmarkable/database";

type DeviceProps = {
  readonly device: DeviceType | null;
};

export const Device = memo<DeviceProps>(({ device }) => {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col justify-start space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your device</h1>
        <p className="ml-1 text-sm text-muted-foreground">
          Place where all the magic happens 🪄
        </p>
      </div>
      {device ? (
        <DeviceTile device={device} />
      ) : (
        <AddDeviceDialog>
          <Empty
            icon={<EmptyDeviceIcon />}
            title="You haven't registered your device yet, do it to unlock sync!"
          />
        </AddDeviceDialog>
      )}
    </div>
  );
});

Device.displayName = "Device";
