import { removeProtocolsFromUrl } from "@syncreads/shared";
import { QueryClientProvider } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { queryClient } from "@/lib/api";
import { env } from "@/lib/env";
import withErrorBoundary from "@/lib/hoc/withErrorBoundary";
import withSuspense from "@/lib/hoc/withSuspense";
import { useSession } from "@/lib/hooks/useSession";
import { useSync } from "@/lib/hooks/useSync";
import { cn } from "@/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

import { Error } from "./layout/error";
import { PopupLayout } from "./layout/layout";
import { Loading } from "./layout/loading";
import { Unauthorized } from "./layout/unauthorized";

const Component = () => {
  const { data: session, isLoading: isSessionLoading } = useSession();
  const {
    mutate: queueArticleSync,
    data: syncData,
    error: syncError,
    isLoading: isArticleSyncLoading,
  } = useSync();
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);

  if (isSessionLoading) {
    return <Loading />;
  }

  if (!session) {
    return <Unauthorized />;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    setActiveTab(tabs[0] ?? null);
  });

  return (
    <>
      <div className="mb-2 flex w-full items-start justify-start gap-3">
        {activeTab ? (
          <>
            <Avatar>
              <AvatarImage src={activeTab?.favIconUrl} />
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-0.5 overflow-hidden text-ellipsis">
              <span className="max-w-full overflow-hidden text-ellipsis text-[0.9rem] font-bold leading-snug">
                {activeTab?.title}
              </span>
              <p className="max-w-full overflow-hidden text-ellipsis text-muted-foreground">
                {removeProtocolsFromUrl(activeTab.url ?? "")}
              </p>
            </div>
          </>
        ) : (
          <Skeleton className="h-20 w-full" />
        )}
      </div>

      <div className="mb-1.5 w-full">
        {syncData ? (
          <a
            href={`${env.VITE_WEB_APP_URL}/dashboard/syncs/${syncData.id}`}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants(),
              "flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 bg-success text-[0.8rem] hover:bg-success/90",
            )}
          >
            Success! Track it <ArrowRight className="w-3.5" />
          </a>
        ) : (
          <Button
            className={cn(
              "h-9 w-full text-[0.8rem]",
              !!syncError &&
                "bg-destructive text-destructive-foreground hover:bg-destructive disabled:opacity-100",
            )}
            disabled={isArticleSyncLoading || !!syncError}
            onClick={() =>
              queueArticleSync({
                user: session.user,
                input: {
                  url: activeTab?.url ?? "",
                },
              })
            }
          >
            {isArticleSyncLoading ? (
              <Loader2 className="h-[1.12rem] w-[1.12rem] animate-spin" />
            ) : !!syncError ? (
              typeof syncError === "string" ? (
                syncError
              ) : (
                "Something went wrong! Try again later."
              )
            ) : (
              "Sync now!"
            )}
          </Button>
        )}
      </div>
    </>
  );
};

export const Popup = withErrorBoundary(
  withSuspense(
    () => (
      <QueryClientProvider client={queryClient}>
        <PopupLayout>
          <Component />
        </PopupLayout>
      </QueryClientProvider>
    ),
    <Loading />,
  ),
  <Error />,
);
