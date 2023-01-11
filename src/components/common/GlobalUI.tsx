import { useUIContext } from "../../providers/UIProvider";

import { GenericLoader } from "./GenericLoader";

export const GlobalUI = () => {
  const { isGenericLoaderEnabled } = useUIContext();

  return <>{isGenericLoaderEnabled && <GenericLoader />}</>;
};
