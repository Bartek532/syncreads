/* eslint-disable import/order */
import "webextension-polyfill";

import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { supabase } from "@/lib/supabase";
import type {
  Message,
  OPERATION_TYPE,
  OperationName,
  Response,
} from "@/lib/api";
import { operations } from "@/lib/api";
import type { QUERIES } from "@/lib/api/queries";

reloadOnUpdate("pages/background");

const getUserApiKey = async (userId: string) => {
  console.log("suapabse", userId);
  return supabase
    .from("ApiKey")
    .select("key")
    .eq("userId", userId)
    .single()
    .throwOnError();
};

chrome.runtime.onMessage.addListener(
  <T extends OPERATION_TYPE, K extends OperationName<T>>(
    request: Message<T, K>,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: Response<T, K> | null) => void,
  ) => {
    console.log("Received message in background script", request, sender);

    void (async () => {
      const operation = operations[request.type][request.name];

      if (typeof operation !== "function") {
        throw new Error("Operation not found!");
      }

      if (request.payload) {
        const response = (await operation(request.payload)) as Response<T, K>;
        sendResponse(response);
      } else {
        const response = (await operation()) as Response<T, K>;
        sendResponse(response);
      }

      sendResponse(null);
    })();

    return true;
  },
);

console.log("Background script is running!");
