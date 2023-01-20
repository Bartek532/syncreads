import { Seo } from "../components/common/Seo";
import { RegisterView } from "../views/register/Register";

import type { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <>
      <Seo title="Register" />
      <RegisterView />
    </>
  );
};

export default Register;
