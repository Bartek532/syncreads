interface SectionHeadingProps {
  readonly title: string;
  readonly description: string;
}

export const SectionHeading = ({ title, description }: SectionHeadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-center text-lg text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};
