import { redirect } from "next/navigation";

import { SyncLog } from "@/components/dashboard/syncs/log/Log";
import { api } from "@/trpc/server";

import { RealtimeSyncStatus } from "../../../../components/dashboard/syncs/table/status/RealtimeSyncStatus";

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
        <RealtimeSyncStatus sync={sync} />
      </div>
      <SyncLog log={log[0]} sync={sync} />
    </div>
  );
};

export default Sync;
