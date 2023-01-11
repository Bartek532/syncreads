import { useEffect } from "react";

import { useUIContext } from "../../providers/UIProvider";

export const useGenericLoader = (isEnabled: boolean | boolean[]) => {
  const { setIsGenericLoaderEnabled } = useUIContext();

  useEffect(() => {
    if (
      (typeof isEnabled === "boolean" && isEnabled) ||
      (Array.isArray(isEnabled) && isEnabled.find((value) => value))
    ) {
      setIsGenericLoaderEnabled(true);
    } else {
      setIsGenericLoaderEnabled(false);
    }
  }, [isEnabled, setIsGenericLoaderEnabled]);
};
