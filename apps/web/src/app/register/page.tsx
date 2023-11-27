import { getProviders } from "next-auth/react";

import { Seo } from "../../components/common/Seo";
import { RegisterView } from "../../views/register/Register";

const Register = async () => {
  const providers = await getProviders();

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
