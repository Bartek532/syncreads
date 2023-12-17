import { memo } from "react";

import type { SyntheticEvent } from "react";

interface EmptyProps {
  readonly children: React.ReactNode;
  readonly onCreateNew: (event: SyntheticEvent) => void;
}

export const Empty = memo<EmptyProps>(({ children, onCreateNew }) => {
  return (
    <button
      type="button"
      className="relative mt-6 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:py-24"
      onClick={onCreateNew}
    >
      {children}
    </button>
  );
});

Empty.displayName = "Empty";
