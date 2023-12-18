"use client";

import { memo } from "react";

import EmptyDeviceIcon from "public/svg/empty-device.svg";

import { AddDeviceDialog } from "./dialog/add-device-dialog";
import { DeviceTile } from "./tile/device-tile";

import type { Device as DeviceType } from "@rssmarkable/database";

type DeviceProps = {
  readonly device: DeviceType | null;
};

export const Device = memo<DeviceProps>(({ device }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-start space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your device</h1>
        <p className="ml-1 text-sm text-muted-foreground">
          Place where all the magic happens 🪄
        </p>
      </div>
      {device ? (
        <div className="mt-4">
          <DeviceTile device={device} />
        </div>
      ) : (
        <AddDeviceDialog>
          <button className="relative mt-6 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:py-24">
            <EmptyDeviceIcon className="h-50 mx-auto w-40 text-muted-foreground" />
            <span className="mt-8 block text-lg font-medium">
              You haven&apos;t registered your device yet, do it to unlock sync!
            </span>
          </button>
        </AddDeviceDialog>
      )}
    </div>
  );
});

Device.displayName = "Device";
