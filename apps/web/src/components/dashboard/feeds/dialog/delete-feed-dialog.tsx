import { memo } from "react";
import toast from "react-hot-toast";
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
import { TRPCError } from "@trpc/server";
import { onPromise } from "../../../../utils";

type DeleteFeedDialogProps = {
  readonly children?: React.ReactNode;
  readonly feeds: Map<string, string>;
};

export const DeleteFeedDialog = memo<DeleteFeedDialogProps>(
  ({ children, feeds }) => {
    const onDelete = async () => {
      //   await toast.promise(() => {}, {
      //     loading: `Deleting ${feeds.size} feed${feeds.size > 1 && "s"}...`,
      //     success: ({ message }) => message,
      //     error: (err: TRPCError | Error) => err.message,
      //   });
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to delete {feeds.size} feed{feeds.size > 1 && "s"}:
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
