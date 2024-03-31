import { removeProtocolsFromUrl } from "@rssmarkable/shared";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/api";
import withErrorBoundary from "@/lib/hoc/withErrorBoundary";
import withSuspense from "@/lib/hoc/withSuspense";
import { useSession } from "@/lib/hooks/useSession";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

import { Error } from "./layout/error";
import { PopupLayout } from "./layout/layout";
import { Loading } from "./layout/loading";
import { Unauthorized } from "./layout/unauthorized";

const Component = () => {
  const { session, isLoading: isSessionLoading } = useSession();
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);

  // const { data, mutate, isLoading } = useMutation({
  //   mutationFn: () => {
  //     console.log("fetching active tab", session.session.data.user.id);
  //     return chrome.runtime.sendMessage({
  //       type: "GET_ACTIVE_TAB",
  //       payload: { userId: session.session.data.user.id },
  //     });
  //   },
  // });

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
        <Button className="h-8.5  w-full text-[0.8rem]">Sync now!</Button>
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
