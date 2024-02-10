import { memo } from "react";
import { toast } from "react-hot-toast";

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

import { unregisterDevice } from "./actions";

type DeleteDeviceDialogProps = {
  readonly children?: React.ReactNode;
};

export const DeleteDeviceDialog = memo<DeleteDeviceDialogProps>(
  ({ children }) => {
    const onDelete = async () => {
      const loadingToast = toast.loading("Deleting your device...");

      const { message, success } = await unregisterDevice();

      if (success) {
        toast.success(message, { id: loadingToast });
      } else {
        toast.error(message, { id: loadingToast });
      }
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
