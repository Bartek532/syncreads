import { memo } from "react";

import { Header } from "./header/header";

type ExploreLayoutProps = {
  readonly children?: React.ReactNode;
};

export const ExploreLayout = memo<ExploreLayoutProps>(({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-8 pb-16 lg:gap-10 lg:pb-28">
      <Header />

      <div className="mt-16 w-full">{children}</div>

      {/* <Feedback /> */}
    </div>
  );
});

ExploreLayout.displayName = "ExploreLayout";
