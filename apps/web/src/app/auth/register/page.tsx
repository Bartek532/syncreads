import { Auth } from "../../../components/auth/Auth";
import { Seo } from "../../../components/common/Seo";
import { AUTH_PROVIDER } from "../../../types/auth.types";

const Register = () => {
  return (
    <>
      <Seo />
      <Auth.Layout>
        <Auth.Header
          title="Register to RSSmarkable"
          description="and always be up to date! 🔄"
        />
        <Auth.Providers providers={Object.values(AUTH_PROVIDER)} />
        <Auth.Divider />
        <Auth.Register />
      </Auth.Layout>
    </>
  );
};

export default Register;
