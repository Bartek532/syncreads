import { memo } from "react";

import { retrieveChild } from "../../utils/retrieve-child";

import { LoginForm } from "./form/login-form";
import { RegisterForm } from "./form/register-form";
import { SocialProviders } from "./form/social-providers.";
import { AuthDivider } from "./layout/auth-divider";
import { AuthHeader } from "./layout/auth-header";

type AuthLayoutProps = {
  readonly children: React.ReactNode;
  readonly quote: {
    readonly content: string;
    readonly author: string;
  };
};

const AuthLayout = memo<AuthLayoutProps>(({ children, quote }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-start py-12 px-4 dark:bg-slate-900 sm:px-6 lg:flex-none lg:px-20 xl:px-28">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {retrieveChild(children, AuthHeader.displayName)}
          <div className="mt-8 flex flex-col gap-6">
            {retrieveChild(children, SocialProviders.displayName)}
            {retrieveChild(children, AuthDivider.name)}
            {retrieveChild(children, LoginForm.displayName) ??
              retrieveChild(children, RegisterForm.displayName)}
          </div>
        </div>
      </div>
      <div className="hidden flex-1 items-end bg-primary p-12 lg:flex">
        <div className="mt-auto max-w-2xl text-secondary">
          <figure className="space-y-2">
            <blockquote className="text-lg">{quote.content}</blockquote>
            <figcaption className="text-sm">{quote.author}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
});

AuthLayout.displayName = "AuthLayout";

export const Auth = {
  Layout: AuthLayout,
  Header: AuthHeader,
  Providers: SocialProviders,
  Divider: AuthDivider,
  Login: LoginForm,
  Register: RegisterForm,
};
