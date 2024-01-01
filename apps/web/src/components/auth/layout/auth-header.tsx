import { memo } from "react";

import { Logo } from "../../ui/logo";

type AuthHeaderProps = {
  readonly title: string;
  readonly description: string;
};

export const AuthHeader = memo<AuthHeaderProps>(({ title, description }) => {
  return (
    <div>
      <Logo />
      <h1 className="mt-8 text-3xl font-bold tracking-tight sm:mt-10">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
});

AuthHeader.displayName = "AuthHeader";
