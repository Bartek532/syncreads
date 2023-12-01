import Image from "next/image";
import { memo } from "react";

import { retrieveChild } from "../../utils/retrieveChild";

import { LoginForm } from "./form/LoginForm";
import { SocialProviders } from "./form/SocialProviders";
import { AuthDivider } from "./layout/AuthDivider";
import { AuthHeader } from "./layout/AuthHeader";

type AuthLayoutProps = {
  readonly children: React.ReactNode;
};

const AuthLayout = memo<AuthLayoutProps>(({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-start  py-12 px-4  dark:bg-slate-900 sm:px-6 lg:flex-none lg:px-20 xl:px-28">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {retrieveChild(children, AuthHeader.displayName)}
          {retrieveChild(children, SocialProviders.displayName)}
          {retrieveChild(children, AuthDivider.name)}

          {retrieveChild(children, LoginForm.displayName)}
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="/images/entry-page-background.jpg"
          fill
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
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
};
