import { getProviders } from "next-auth/react";

import { Seo } from "../../components/common/Seo";
import { LoginView } from "../../views/login/Login";

const Login = async () => {
  const providers = await getProviders();

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
