import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { onPromise } from "../../../utils/functions";
import { trpc } from "../../../utils/trpc";
import { createFeedSchema } from "../../../utils/validation";
import { Input } from "../../common/Input";
import { FormModal } from "../FormModal";

import type { CreateFeedInput } from "../../../utils/validation";
import type { BaseModal } from "../BaseModal";
import type { TRPCError } from "@trpc/server";
import type { ComponentProps } from "react";

type AddFeedModalProps = Omit<
  ComponentProps<typeof BaseModal>,
  "children" | "title" | "icon"
>;

export const AddFeedModal = memo<AddFeedModalProps>(({ onClose, ...props }) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<CreateFeedInput>({
    resolver: zodResolver(createFeedSchema),
  });
  const utils = trpc.useContext();
  const addFeedMutation = trpc.feed.createFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

  useEffect(() => {
    setFocus("url");
  }, [setFocus]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = handleSubmit(async ({ url }) => {
    await toast.promise(
      addFeedMutation.mutateAsync({
        url,
      }),
      {
        loading: "Adding feed...",
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
      onClose={onClose}
      title="Add feed and be up to date!"
      icon={<PlusIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />}
      submitText="Add feed"
      onSubmit={onPromise(onSubmit)}
      {...props}
    >
      <Input
        type="url"
        placeholder="Pass feed url here..."
        error={errors.url}
        {...register("url")}
      />
    </FormModal>
  );
});

AddFeedModal.displayName = "AddFeedModal";
