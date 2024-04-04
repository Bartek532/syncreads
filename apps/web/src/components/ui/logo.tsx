import { APP_NAME } from "@syncreads/shared";
import Link from "next/link";
import { memo } from "react";

import AppLogo from "public/svg/logo.svg";

import { cn } from "../../utils";

type Size = "sm" | "md" | "lg";

type LogoProps = {
  readonly withText?: boolean;
  readonly size?: Size;
};

const logoSizes = {
  sm: "w-6",
  md: "w-8",
  lg: "w-10",
};

const textSizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

export const Logo = memo<LogoProps>(({ withText = true, size = "md" }) => {
  const logoSize = logoSizes[size];
  const textSize = textSizes[size];

  return (
    <Link className="flex flex-shrink-0 items-center gap-5" href="/#hero">
      <AppLogo className={cn(logoSize)} />
      {withText && (
        <span className={cn("font-bold", textSize)}>{APP_NAME}</span>
      )}
    </Link>
  );
});

Logo.displayName = "Logo";
