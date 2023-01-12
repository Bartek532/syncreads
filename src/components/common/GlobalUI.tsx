import { useUIContext } from "../../providers/UIProvider";

import { GlobalLoader } from "./GlobalLoader";

export const GlobalUI = () => {
  const { isGenericLoaderEnabled } = useUIContext();

  return <>{isGenericLoaderEnabled && <GlobalLoader />}</>;
};
