import { forwardRef } from "react";

interface EmptyProps {
  readonly children: React.ReactNode;
}

export const Empty = forwardRef<HTMLButtonElement, EmptyProps>(
  ({ children }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="relative mt-6 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:py-24"
      >
        {children}
      </button>
    );
  },
);

Empty.displayName = "Empty";
