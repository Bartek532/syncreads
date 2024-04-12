import { memo } from "react";

import { Cta } from "../../home/cta/cta";
import { Feedback } from "../../layout/feedback/feedback";

import { Header } from "./header/header";

type ExploreLayoutProps = {
  readonly children?: React.ReactNode;
};

export const ExploreLayout = memo<ExploreLayoutProps>(({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-8 pb-16 lg:gap-10 lg:pb-28">
      <Header />
      <div className="mt-4 w-full sm:mt-6 md:mt-14 lg:mt-20">{children}</div>
      <Cta />
      <Feedback />
    </div>
  );
});

ExploreLayout.displayName = "ExploreLayout";
