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

import { deleteFeeds } from "./actions";

type DeleteFeedDialogProps = {
  readonly children?: React.ReactNode;
  readonly feeds: Map<string, string>;
};

export const DeleteFeedDialog = memo<DeleteFeedDialogProps>(
  ({ children, feeds }) => {
    const onDelete = async () => {
      const loadingToast = toast.loading("Deleting feeds...");
      const { message, success } = await deleteFeeds({
        in: Array.from(feeds.keys()),
      });

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
              You&apos;re about to delete {feeds.size} feed
              {feeds.size > 1 && "s"}:
              <ul className="px-2 py-3">
                {Array.from(feeds).map(([id, url]) => (
                  <li key={id}>{url}</li>
                ))}
              </ul>
              This will stop you from syncing new content from{" "}
              {feeds.size > 1 ? "them" : "it"}.
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

DeleteFeedDialog.displayName = "DeleteFeedDialog";
