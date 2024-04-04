import { SyncArticleDialog } from "@/components/dashboard/feeds/articles/dialog/sync-article-dialog";
import { Syncs } from "@/components/dashboard/syncs/syncs";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";

import { getMetadata } from "../../../lib/metadata";
import { supabase } from "../../../lib/supabase/server";

export const metadata = getMetadata({
  title: "Syncs",
});

const DashboardSyncs = async () => {
  const { syncs, total } = await api.user.getUserSyncs.query({});
  const { data } = await supabase().auth.getUser();

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            You synced articles <span className="text-4xl">{total}</span> times!
          </h1>
          <p className="ml-1 text-sm text-muted-foreground">
            Get a quick look at how much time you saved ⌛
          </p>
        </div>
        <SyncArticleDialog user={data.user}>
          <Button>Sync article</Button>
        </SyncArticleDialog>
      </div>
      <Syncs syncs={syncs} />
    </div>
  );
};

export default DashboardSyncs;
