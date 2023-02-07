import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { onPromise } from "../../../utils/functions";
import { trpc } from "../../../utils/trpc";
import { createFeedSchema } from "../../../utils/validation";
import { Input } from "../../common/Input";
import { FormModal } from "../FormModal";

import type { SyncArticleInput } from "../../../utils/validation";
import type { BaseModal } from "../BaseModal";
import type { TRPCError } from "@trpc/server";
import type { ComponentProps } from "react";

type SyncArticleModalProps = Omit<
  ComponentProps<typeof BaseModal>,
  "children" | "title" | "icon"
>;

export const SyncArticleModal = memo<SyncArticleModalProps>(
  ({ onClose, ...props }) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
      reset,
    } = useForm<SyncArticleInput>({
      resolver: zodResolver(createFeedSchema),
    });
    const utils = trpc.useContext();
    const syncArticleMutation = trpc.feed.syncArticle.useMutation({
      onSuccess: () => utils.user.getUserSyncs.invalidate(),
    });

    useEffect(() => {
      reset();
    }, [isSubmitSuccessful, reset]);

    const onSubmit = handleSubmit(async ({ url }) => {
      await toast.promise(
        syncArticleMutation.mutateAsync({
          url,
        }),
        {
          loading: "Syncing article...",
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
        title="Sync any article from the web!"
        icon={ArrowPathIcon}
        submitText="Sync!"
        onSubmit={onPromise(onSubmit)}
        {...props}
      >
        <Input
          type="url"
          placeholder="Pass url here..."
          error={errors.url}
          {...register("url")}
        />
      </FormModal>
    );
  },
);

SyncArticleModal.displayName = "SyncArticleModal";
