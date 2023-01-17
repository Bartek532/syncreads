import { useState } from "react";
import { toast } from "react-hot-toast";

import EmptyDeviceIcon from "public/svg/empty-device.svg";

import { Empty } from "../../../components/common/Empty";
import { Heading } from "../../../components/dashboard/heading/Heading";
import { AddDeviceModal } from "../../../components/modal/device/AddDeviceModal";
import { DeviceTile } from "../../../components/tile/deviceTile/DeviceTile";
import { useGenericLoader } from "../../../hooks/useGenericLoader";
import { trpc } from "../../../utils/trpc";

import type { RegisterDeviceInput } from "../../../utils/validation";
import type { TRPCError } from "@trpc/server";

export const DeviceView = () => {
  const utils = trpc.useContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: device, isLoading: isDeviceLoading } =
    trpc.user.getUserDevice.useQuery();

  const registerDeviceMutation = trpc.user.registerDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

  const unregisterDeviceMutation = trpc.user.unregisterDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

  useGenericLoader(isDeviceLoading);

  const onAdd = async ({ code }: RegisterDeviceInput) => {
    await toast.promise(
      registerDeviceMutation.mutateAsync({
        code,
      }),
      {
        loading: "Registering your device...",
        success: ({ message }) => {
          setIsAddModalOpen(false);
          return message;
        },
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

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
        setIsOpen={setIsAddModalOpen}
        onAdd={onAdd}
      />
      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <Heading level={3}>Your device</Heading>

        {device ? (
          <div className="mt-8">
            <DeviceTile device={device} onDelete={handleDeleteDevice} />
          </div>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyDeviceIcon className="h-50 mx-auto w-40 text-gray-400" />
            <span className="mt-6 block text-lg font-medium text-gray-900">
              You haven&apos;t registered your device yet, do it to unlock sync!
              🔄
            </span>
          </Empty>
        )}
      </section>
    </>
  );
};
