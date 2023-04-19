import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

import { Seo } from "../components/common/Seo";
import { RegisterView } from "../views/register/Register";

import type { AUTH_PROVIDER } from "../../types/auth.types";
import type { ClientSafeProvider } from "next-auth/react";

const Register = () => {
  const [providers, setProviders] = useState<Record<
    AUTH_PROVIDER,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

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
