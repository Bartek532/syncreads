import { useUIContext } from "../../providers/UIProvider";

import { GlobalLoader } from "./loading/Loader";

export const GlobalUI = () => {
  const { isGenericLoaderEnabled } = useUIContext();

  return <>{isGenericLoaderEnabled && <GlobalLoader />}</>;
};
