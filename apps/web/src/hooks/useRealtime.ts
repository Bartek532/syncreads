import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";

import type { Log, Sync } from "@rssmarkable/database";
import type { LogMessage } from "@rssmarkable/shared";

export const useRealtimeLog = ({
  syncId,
  initial,
  onPayload,
}: {
  syncId: string;
  initial?: Log & {
    json: LogMessage[];
  };
  onPayload?: (
    payload: Log & {
      json: LogMessage[];
    },
  ) => void;
}) => {
  const [log, setLog] = useState<
    | (Log & {
        json: LogMessage[];
      })
    | null
  >(initial ?? null);

  useEffect(() => {
    const channel = supabase()
      .channel("log:update")
      .on<Log & { json: LogMessage[] }>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Log",
          filter: `syncId=eq.${syncId}`,
        },
        (payload) => {
          setLog(payload.new);
          onPayload?.(payload.new);
        },
      )
      .subscribe();

    return () => void channel.unsubscribe();
  }, [syncId, onPayload]);

  return log;
};

export const useRealtimeSync = ({
  id,
  initial,
}: {
  id: string;
  initial?: Sync;
}) => {
  const [sync, setSync] = useState<Sync | null>(initial ?? null);

  useEffect(() => {
    const channel = supabase()
      .channel("sync:update")
      .on<Sync>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Sync",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log(payload);
          setSync(payload.new);
        },
      )
      .subscribe();

    return () => void channel.unsubscribe();
  }, [id]);

  return sync;
};
