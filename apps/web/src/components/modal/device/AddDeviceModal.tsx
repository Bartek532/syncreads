import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { api } from "../../../trpc/react";
import { onPromise } from "../../../utils/functions";
import { registerDeviceSchema } from "../../../utils/validation/schema";
import { Input } from "../../common/Input";
import { FormModal } from "../FormModal";

import type { HeroIcon } from "../../../types/common.types";
import type { RegisterDeviceInput } from "../../../utils/validation/types";
import type { BaseModal } from "../BaseModal";
import type { TRPCError } from "@trpc/server";
import type { ComponentProps } from "react";

type AddDeviceModalProps = Omit<
  ComponentProps<typeof BaseModal>,
  "children" | "title" | "icon"
>;

export const AddDeviceModal = memo<AddDeviceModalProps>(
  ({ isOpen, onClose, ...props }) => {
    const utils = api.useUtils();
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
      reset,
    } = useForm<RegisterDeviceInput>({
      resolver: zodResolver(registerDeviceSchema),
    });
    const registerDeviceMutation = api.user.registerDevice.useMutation({
      onSuccess: () => utils.user.getUserDevice.invalidate(),
    });

    useEffect(() => {
      reset();
    }, [isSubmitSuccessful, reset]);

    const onSubmit = handleSubmit(async ({ code }) => {
      await toast.promise(
        registerDeviceMutation.mutateAsync({
          code,
        }),
        {
          loading: "Registering your device...",
          success: ({ message }) => {
            onClose();

            return message;
          },
          error: (err: TRPCError | Error) => err.message,
        },
      );
    });

    return (
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        title="Register device to enable sync!"
        icon={PuzzlePieceIcon as HeroIcon}
        submitText="Register device"
        onSubmit={onPromise(onSubmit)}
        {...props}
      >
        <Input
          placeholder="Enter your one-time code..."
          error={errors.code}
          {...register("code")}
        />
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          You can find one-time code on{" "}
          <a
            href="https://my.remarkable.com/device/desktop/connect"
            className="text-indigo-500 hover:text-indigo-700"
            target="_blank"
            rel="noreferrer"
          >
            your reMarkable account.
          </a>
        </p>
      </FormModal>
    );
  },
);

AddDeviceModal.displayName = "AddDeviceModal";
