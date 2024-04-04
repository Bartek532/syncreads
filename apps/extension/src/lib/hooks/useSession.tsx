import { useQuery } from "@tanstack/react-query";

import { OPERATION_TYPE } from "../api";
import { QUERIES } from "../api/queries";

import type { Message, Response } from "../api";

export const useSession = () =>
  useQuery({
    queryKey: [QUERIES.SESSION],
    queryFn: async () => {
      const response = await chrome.runtime.sendMessage<
        Message<OPERATION_TYPE.QUERY, QUERIES.SESSION>,
        Response<OPERATION_TYPE.QUERY, QUERIES.SESSION>
      >({
        type: OPERATION_TYPE.QUERY,
        name: QUERIES.SESSION,
        payload: undefined,
      });

      if (response.error) {
        return Promise.reject(response.error);
      }

      return response.data;
    },
  });
