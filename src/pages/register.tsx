import { getProviders } from "next-auth/react";

import { Seo } from "../components/common/Seo";
import { RegisterView } from "../views/register/Register";

import type { InferGetServerSidePropsType } from "next";

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

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
