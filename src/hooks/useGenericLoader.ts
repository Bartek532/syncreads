import { useUIContext } from "../providers/UIProvider";

export const useGenericLoader = (isEnabled: boolean | boolean[]) => {
  const { setIsGenericLoaderEnabled } = useUIContext();
  const enabled =
    !!(typeof isEnabled === "boolean" && isEnabled) ||
    !!(Array.isArray(isEnabled) && isEnabled.includes(true));

  setIsGenericLoaderEnabled(enabled);
};
