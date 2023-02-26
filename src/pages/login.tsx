import { getProviders } from "next-auth/react";

import { Seo } from "../components/common/Seo";
import { LoginView } from "../views/login/Login";

import type { InferGetServerSidePropsType } from "next";

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!providers) {
    return null;
  }

  return (
    <>
      <Seo />
      <LoginView providers={providers} />
    </>
  );
};

export default Login;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
