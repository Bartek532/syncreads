import { useEffect } from "react";

import { lockScroll, unlockScroll } from "../../../utils/pageScroll";

import { Spinner } from "./Spinner";

export const GlobalLoader = () => {
  useEffect(() => {
    lockScroll();

    return () => unlockScroll();
  }, []);

  return (
    <div
      role="presentation"
      className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/75 dark:bg-black/75"
    >
      <Spinner className="h-14 w-14" />
    </div>
  );
};
