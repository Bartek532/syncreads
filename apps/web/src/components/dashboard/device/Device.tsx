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
      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Your device
        </h1>

        {device ? (
          <div className="mt-8">
            <DeviceTile device={device} onDelete={handleDeleteDevice} />
          </div>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyDeviceIcon className="h-50 mx-auto w-40 text-gray-400 dark:text-white" />
            <span className="mt-6 block text-lg font-medium text-gray-900 dark:text-white">
              You haven&apos;t registered your device yet, do it to unlock sync!
              🔄
            </span>
          </Empty>
        )}
      </section>
    </>
  );
};
