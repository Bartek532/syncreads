import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { FILE_TYPE } from "../../../types/feed.types";
import { onPromise } from "../../../utils/functions";
import { trpc } from "../../../utils/trpc";
import { createFeedSchema } from "../../../utils/validation/schema";
import { FileUpload } from "../../common/FileUpload";
import { Input } from "../../common/Input";
import { FormModal } from "../FormModal";

import type { HeroIcon } from "../../../types/common.types";
import type { CreateFeedInput } from "../../../utils/validation/types";
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
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<CreateFeedInput>({
    resolver: zodResolver(createFeedSchema),
  });
  const utils = trpc.useContext();
  const addFeedMutation = trpc.feed.createFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });
  const importFeedsMutation = trpc.feed.importFeeds.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

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

  const handleFileUpload = async ([file]: File[]) => {
    const extension = file?.name.split(".").pop();

    if (!extension || !Object.values<string>(FILE_TYPE).includes(extension)) {
      return toast.error("Unsupported file type provided!");
    }

    if (!file) {
      return;
    }

    const content = await file.text();

    return toast.promise(
      importFeedsMutation.mutateAsync({ content, type: FILE_TYPE.OPML }),
      {
        loading: "Uploading feeds...",
        success: ({ message }) => {
          onClose();
          return message;
        },
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

  return (
    <FormModal
      onClose={onClose}
      title="Add feed and be up to date!"
      icon={PlusIcon as HeroIcon}
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
      <p className="mt-2 text-sm">
        or{" "}
        <FileUpload
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={handleFileUpload}
          accept=".opml"
        >
          <button
            type="button"
            className="font-medium text-indigo-700 hover:text-indigo-900"
          >
            import OPML file
          </button>
        </FileUpload>
      </p>
    </FormModal>
  );
});

AddFeedModal.displayName = "AddFeedModal";
