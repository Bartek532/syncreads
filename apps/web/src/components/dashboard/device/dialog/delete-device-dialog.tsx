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

import { deleteDevice } from "./actions/actions";

type DeleteDeviceDialogProps = {
  readonly children?: React.ReactNode;
};

export const DeleteDeviceDialog = memo<DeleteDeviceDialogProps>(
  ({ children }) => {
    const onDelete = async () => {
      await toast.promise(deleteDevice(), {
        loading: "Deleting device...",
        success: ({ message }) => message,
        error: (err: Error) => err.message,
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
