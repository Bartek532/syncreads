import { memo } from "react";

interface SectionHeadingProps {
  readonly title: string;
  readonly description: string;
}

export const SectionHeading = memo(
  ({ title, description }: SectionHeadingProps) => {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-center text-4xl font-semibold text-slate-900 dark:text-white sm:text-4xl lg:text-6xl">
          {title}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-center text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    );
  },
);

SectionHeading.displayName = "c";
