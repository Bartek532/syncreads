import { Seo } from "../components/common/Seo";
import { LoginView } from "../views/login/Login";

import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <>
      <Seo title="Log in" />
      <LoginView />
    </>
  );
};

export default Login;
