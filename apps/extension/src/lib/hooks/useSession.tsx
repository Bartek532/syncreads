import { useQuery } from "@tanstack/react-query";

import { OPERATION_TYPE } from "../api";
import { QUERIES } from "../api/queries";

import type { Message, Response } from "../api";

export const useSession = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERIES.SESSION],
    queryFn: async () =>
      chrome.runtime.sendMessage<
        Message<OPERATION_TYPE.QUERY, QUERIES.SESSION>,
        Response<OPERATION_TYPE.QUERY, QUERIES.SESSION>
      >({
        type: OPERATION_TYPE.QUERY,
        name: QUERIES.SESSION,
      }),
  });

  return {
    session: data,
    isLoading,
  };
};
