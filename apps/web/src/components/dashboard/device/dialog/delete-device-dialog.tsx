import { GENERIC_ERROR_MESSAGE } from "@rssmarkable/shared";
import { revalidatePath } from "next/cache";
import { memo } from "react";
import { toast } from "react-hot-toast";

import { api } from "@/trpc/react";

import { onPromise } from "../../../../utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../ui/alert-dialog";

type DeleteDeviceDialogProps = {
  readonly children?: React.ReactNode;
};

export const DeleteDeviceDialog = memo<DeleteDeviceDialogProps>(
  ({ children }) => {
    const { mutateAsync } = api.user.unregisterDevice.useMutation({
      onSuccess: () => revalidatePath("/dashboard/device"),
    });

    const onDelete = async () => {
      await toast.promise(mutateAsync(), {
        loading: "Deleting device...",
        success: ({ message }) => message,
        error: (err?: Error) => err?.message ?? GENERIC_ERROR_MESSAGE,
      });
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              device and prevent you from syncing new content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onPromise(onDelete)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

DeleteDeviceDialog.displayName = "DeleteDeviceDialog";
