import { useMutation } from "@tanstack/react-query";

import { OPERATION_TYPE } from "../api";
import { MUTATIONS } from "../api/mutations";

import type { Message, Response } from "../api";
import type { User } from "@syncreads/database";
import type { SyncArticleInput } from "@syncreads/shared";

export const useSync = () =>
  useMutation({
    mutationFn: async (input: { user: User; input: SyncArticleInput }) => {
      const response = await chrome.runtime.sendMessage<
        Message<OPERATION_TYPE.MUTATION, MUTATIONS.SYNC_ARTICLE>,
        Response<OPERATION_TYPE.MUTATION, MUTATIONS.SYNC_ARTICLE>
      >({
        type: OPERATION_TYPE.MUTATION,
        name: MUTATIONS.SYNC_ARTICLE,
        payload: input,
      });

      if (response.error) {
        return Promise.reject(response.error);
      }

      return response.data;
    },
  });
