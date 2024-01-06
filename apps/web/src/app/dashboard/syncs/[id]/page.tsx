import { SYNC_STATUS_COLORS } from "@/config/sync";
import { api } from "@/trpc/server";
import { capitalize, cn } from "@/utils";

const Sync = async ({ params }: { params: { id: string } }) => {
  const { data } = await api.sync.getSync.query({ id: params.id });

  return (
    <div className="flex flex-col justify-between gap-4 space-y-2 sm:flex-row sm:gap-8">
      <div className="flex flex-col justify-start space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{params.id}</h1>
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "h-3 w-3 rounded-full",
              SYNC_STATUS_COLORS[data.status],
            )}
          ></div>
          <span className="text-sm text-muted-foreground">{capitalize(data.status.toLocaleLowerCase().replace("_", " "))}</span>
        </div>
      </div>
    </div>
  );
};

export default Sync;
