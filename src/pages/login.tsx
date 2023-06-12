import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

import { Seo } from "../components/common/Seo";
import { LoginView } from "../views/login/Login";

import type { AUTH_PROVIDER } from "../../types/auth.types";
import type { ClientSafeProvider } from "next-auth/react";

const Login = () => {
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
      <LoginView providers={providers} />
    </>
  );
};

export default Login;
