import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Input } from "src/components/common/input/Input";
import { DeviceTile } from "src/components/tile/deviceTile/DeviceTile";
import { onPromise } from "src/utils/functions";
import { trpc } from "src/utils/trpc";
import { registerDeviceSchema } from "src/utils/validation";

import type { TRPCError } from "@trpc/server";
import type { RegisterDeviceInput } from "src/utils/validation";

export const DeviceView = () => {
  const { data } = useSession();
  const utils = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDeviceInput>({
    resolver: zodResolver(registerDeviceSchema),
  });

  if (!data?.user?.email) {
    return null;
  }

  const { data: device } = trpc.user.getUserDevice.useQuery();

  const registerDeviceMutation = trpc.user.registerDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

  const unregisterDeviceMutation = trpc.user.unregisterDevice.useMutation({
    onSuccess: () => utils.user.getUserDevice.invalidate(),
  });

  const onSubmit = async ({ code }: RegisterDeviceInput) => {
    await toast.promise(
      registerDeviceMutation.mutateAsync({
        code,
      }),
      {
        loading: "Registering your device...",
        success: ({ message }) => message,
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
    <div>
      <main>
        {device && <DeviceTile device={device} onDelete={handleDeleteDevice} />}
        <form
          className="flex h-screen w-full flex-col items-center justify-center"
          onSubmit={onPromise(handleSubmit(onSubmit))}
        >
          <h2 className="card-title">Add device!</h2>
          <Input type="text" {...register("code")}>
            Enter your one time code
          </Input>
          {errors.code?.message}

          <div className="card-actions items-center justify-between">
            <button className="btn btn-secondary" type="submit">
              Register device
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
