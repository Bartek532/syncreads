import { memo } from "react";

import { cn } from "../../utils";

type EmptyProps = {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly onCreateNew?: () => void;
  readonly className?: string;
};

export const Empty = memo<EmptyProps>(
  ({ icon, title, onCreateNew, className }) => {
    return (
      <button
        onClick={onCreateNew}
        className={cn(
          "relative flex w-full flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:py-24",
          className,
        )}
      >
        <div className="h-50 mx-auto w-40 text-muted-foreground">{icon}</div>
        <span className="mt-8 block text-lg font-medium">{title}</span>
      </button>
    );
  },
);

Empty.displayName = "Empty";
