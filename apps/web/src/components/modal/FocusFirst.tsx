import { useEffect } from "react";

import { focusFirst } from "../../utils/focus";

import type { ReactNode, RefObject } from "react";

type FocusFirstProps = Readonly<{
  containerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}>;

export const FocusFirst = ({ containerRef, children }: FocusFirstProps) => {
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      focusFirst(container);
    }
  }, [containerRef]);

  return <>{children}</>;
};
