import { memo } from "react";

import { Footer } from "./footer";

type PopupLayoutProps = {
  readonly children: React.ReactNode;
};

export const PopupLayout = memo<PopupLayoutProps>(({ children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-4 pb-2.5">
      {children}
      <Footer />
    </div>
  );
});

PopupLayout.displayName = "PopupLayout";
