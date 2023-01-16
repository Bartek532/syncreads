import type { ReactNode } from "react";

interface PanelProps {
  readonly index: number;
  readonly value: number;
  readonly children: ReactNode;
}

export const Panel = ({ index, value, children }: PanelProps) =>
  index === value ? <>{children}</> : null;
