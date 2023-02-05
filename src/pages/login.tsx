import { getProviders } from "next-auth/react";

import { LoginView } from "../views/login/Login";

import type { AUTH_PROVIDER } from "../../types/auth.types";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ClientSafeProvider } from "next-auth/react";

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!providers) {
    return null;
  }

  return <LoginView providers={providers} />;
};

export default Login;

export const getServerSideProps: GetServerSideProps<{
  providers: Record<AUTH_PROVIDER, ClientSafeProvider> | null;
}> = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};
