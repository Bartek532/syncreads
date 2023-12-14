import { memo } from "react";

type AuthHeaderProps = {
  readonly title: string;
  readonly description: string;
};

export const AuthHeader = memo<AuthHeaderProps>(({ title, description }) => {
  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
});

AuthHeader.displayName = "AuthHeader";
