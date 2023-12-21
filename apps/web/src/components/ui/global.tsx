"use client";

import { Toaster } from "react-hot-toast";

import { TOASTER_CONFIG } from "../../config";

export const GlobalUI = () => (
  <Toaster
    position="bottom-right"
    containerStyle={{ padding: "20px" }}
    gutter={13}
    toastOptions={TOASTER_CONFIG}
  />
);
