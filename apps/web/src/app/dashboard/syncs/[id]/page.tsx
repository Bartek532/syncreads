import { redirect } from "next/navigation";

import { SyncLog } from "@/components/dashboard/syncs/log/Log";
import { SYNC_STATUS_COLORS } from "@/config/sync";
import { api } from "@/trpc/server";
import { capitalize, cn } from "@/utils";

const Sync = async ({ params }: { params: { id: string } }) => {
  const { data: sync } = await api.sync.getSync.query({ id: params.id });
  const { data: log } = await api.sync.getSyncLog.query({ syncId: params.id });

  if (!log[0] || !sync) {
    return redirect("/dashboard/syncs");
  }

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col justify-start space-y-2">
        <h1 className="text-3xl font-bold">{params.id}</h1>
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "h-3 w-3 rounded-full",
              SYNC_STATUS_COLORS[sync.status],
            )}
          ></div>
          <span className="text-sm text-muted-foreground">
            {capitalize(sync.status.toLocaleLowerCase().replace("_", " "))}
          </span>
        </div>
      </div>
      <SyncLog log={log[0]} sync={sync} />
    </div>
  );
};

export default Sync;
