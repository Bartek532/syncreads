interface SectionLayoutProps {
  readonly children: React.ReactNode;
}

export const SectionLayout = ({ children }: SectionLayoutProps) => {
  return (
    <section className="my-24 flex flex-col gap-16 sm:my-32">
      {children}
    </section>
  );
};

SectionLayout.displayName = "SectionLayout";
