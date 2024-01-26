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

type DeleteFeedDialogProps = {
  readonly children?: React.ReactNode;
  readonly feeds: Map<string, string>;
};

export const DeleteFeedDialog = memo<DeleteFeedDialogProps>(
  ({ children, feeds }) => {
    const { mutateAsync } = api.user.deleteUserFeeds.useMutation({
      onSuccess: () => revalidatePath("/dashboard/feeds"),
    });

    const onDelete = async () => {
      await toast.promise(mutateAsync({ in: Array.from(feeds.keys()) }), {
        loading: "Deleting feeds...",
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
