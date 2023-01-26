interface SectionHeadingProps {
  readonly title: string;
  readonly description: string;
}

export const SectionHeading = ({ title, description }: SectionHeadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-center text-2xl font-medium text-slate-900 dark:text-white sm:text-4xl lg:text-6xl">
        {title}
      </h3>
      <p className="text-md mx-auto mt-4 max-w-md text-center text-slate-600 dark:text-slate-400 sm:text-lg">
        {description}
      </p>
    </div>
  );
};

SectionHeading.displayName = "c";
