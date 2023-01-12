import { useState } from "react";

import { createSafeContext } from "../utils/createSafeContext";

import type { Dispatch, ReactNode, SetStateAction } from "react";

interface UIContextValue {
  isGenericLoaderEnabled: boolean;
  setIsGenericLoaderEnabled: Dispatch<SetStateAction<boolean>>;
}

const [useUIContext, UIContextProvider] = createSafeContext<UIContextValue>();

const UIProvider = ({ children }: { readonly children: ReactNode }) => {
  const [isGenericLoaderEnabled, setIsGenericLoaderEnabled] = useState(false);

  return (
    <UIContextProvider
      value={{
        isGenericLoaderEnabled,
        setIsGenericLoaderEnabled,
      }}
    >
      {children}
    </UIContextProvider>
  );
};

export { useUIContext, UIProvider };
