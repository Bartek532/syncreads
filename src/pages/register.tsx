import { getProviders } from "next-auth/react";

import { Seo } from "../components/common/Seo";
import { RegisterView } from "../views/register/Register";

import type { AUTH_PROVIDER } from "../../types/auth.types";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ClientSafeProvider } from "next-auth/react";

const Register = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!providers) {
    return null;
  }

  return (
    <>
      <Seo />
      <RegisterView providers={providers} />
    </>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps<{
  providers: Record<AUTH_PROVIDER, ClientSafeProvider> | null;
}> = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};
