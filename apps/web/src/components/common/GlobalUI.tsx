"use client";

import { Toaster } from "react-hot-toast";

import { TOASTER_CONFIG } from "../../config";
import { useUIContext } from "../../providers/UIProvider";

import { GlobalLoader } from "./loading/Loader";

export const GlobalUI = () => {
  const { isGenericLoaderEnabled } = useUIContext();

  return (
    <>
      {isGenericLoaderEnabled && <GlobalLoader />}
      <Toaster
        position="bottom-right"
        containerStyle={{ padding: "20px" }}
        gutter={13}
        toastOptions={TOASTER_CONFIG}
      />
    </>
  );
};
