/* eslint-disable import/order */
import "webextension-polyfill";

import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import type {
  Message,
  OPERATION_TYPE,
  OperationName,
  Response,
} from "@/lib/api";
import { operations } from "@/lib/api";

reloadOnUpdate("pages/background");

chrome.runtime.onMessage.addListener(
  <T extends OPERATION_TYPE, K extends OperationName<T>>(
    request: Message<T, K>,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: Response<T, K> | null) => void,
  ) => {
    console.log("Received message in background script", request, sender);

    void (async () => {
      try {
        const operation = operations[request.type][request.name];

        if (typeof operation !== "function") {
          throw new Error("Operation not found!");
        }

        const response = request.payload
          ? ((await operation(request.payload)) as Response<T, K>["data"])
          : ((await operation()) as Response<T, K>["data"]);

        sendResponse({
          error: null,
          data: response,
        });
      } catch (error) {
        if (error instanceof Error) {
          sendResponse({
            error: error.message,
            data: null,
          });
        }

        sendResponse({
          error: "Something went wrong! Try again later.",
          data: null,
        });
      }
    })();

    return true;
  },
);

console.log("Background script is running!");
