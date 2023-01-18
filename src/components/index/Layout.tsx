import { memo } from "react";

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen overflow-x-hidden dark:bg-black">
      <div className="mx-auto flex h-full max-w-full flex-col justify-between p-4 md:p-8 lg:max-w-screen-xl xl:p-12">
        {children}
      </div>
    </main>
  );
});

Layout.displayName = "Layout";
