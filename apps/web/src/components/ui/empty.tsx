import { memo } from "react";

import { cn } from "../../utils";

type EmptyProps = {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly onCreateNew?: () => void;
  readonly className?: string;
  readonly isTrigger?: boolean;
};

export const Empty = memo<EmptyProps>(
  ({ icon, title, onCreateNew, className, isTrigger = false }) => {
    return (
      <button
        onClick={onCreateNew}
        className={cn(
          "relative flex w-full flex-1 cursor-default flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-16 py-20 text-center transition-colors md:py-24",
          (onCreateNew || isTrigger) &&
            "cursor-pointer hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        tabIndex={onCreateNew || isTrigger ? 0 : -1}
      >
        <div className="h-50 mx-auto flex w-40 items-center justify-center text-muted-foreground">
          {icon}
        </div>
        <span className="mt-8 block text-lg font-medium">{title}</span>
      </button>
    );
  },
);

Empty.displayName = "Empty";
