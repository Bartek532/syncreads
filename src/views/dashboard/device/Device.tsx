import { useState } from "react";
import { toast } from "react-hot-toast";

import EmptyRemarkableIcon from "public/svg/empty-remarkable.svg";
import { Empty } from "src/components/common/empty/Empty";
import { AddDeviceModal } from "src/components/modal/device/AddDeviceModal";
import { trpc } from "src/utils/trpc";

import type { TRPCError } from "@trpc/server";
import type { RegisterDeviceInput } from "src/utils/validation";

export const DeviceView = () => {
  const utils = trpc.useContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: device } = trpc.user.getUserDevice.useQuery();

  const registerDeviceMutation = trpc.user.registerDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

  const unregisterDeviceMutation = trpc.user.unregisterDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

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
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Your device
        </h2>

        {device ? (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {device.token}
          </div>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyRemarkableIcon className="h-50 mx-auto w-40 text-gray-400" />
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
