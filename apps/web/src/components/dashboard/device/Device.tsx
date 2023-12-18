"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import EmptyDeviceIcon from "public/svg/empty-device.svg";

import { Empty } from "../../../components/common/Empty";
import { DeviceTile } from "../../../components/dashboard/device/tile/DeviceTile";
import { AddDeviceModal } from "../../../components/modal/device/AddDeviceModal";
import { useGenericLoader } from "../../../hooks/useGenericLoader";
import { api } from "../../../trpc/react";

import type { TRPCError } from "@trpc/server";

export const Device = () => {
  const utils = api.useUtils();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: device, isLoading: isDeviceLoading } =
    api.user.getUserDevice.useQuery();

  const unregisterDeviceMutation = api.user.unregisterDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

  useGenericLoader(isDeviceLoading);

  const handleDeleteDevice = async () => {
    await toast.promise(unregisterDeviceMutation.mutateAsync(), {
      loading: "Deleting device...",
      success: ({ message }) => message,
      error: (err: TRPCError | Error) => err.message,
    });
  };

  return (
    <>
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your device</h1>
          <p className="ml-1 text-sm text-muted-foreground">
            Place where all the magic happens 🪄
          </p>
        </div>
        {device ? (
          <div className="mt-4">
            <DeviceTile device={device} onDelete={handleDeleteDevice} />
          </div>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyDeviceIcon className="h-50 mx-auto w-40 text-muted-foreground" />
            <span className="mt-8 block text-lg font-medium">
              You haven&apos;t registered your device yet, do it to unlock sync!
            </span>
          </Empty>
        )}
      </div>
    </>
  );
};
