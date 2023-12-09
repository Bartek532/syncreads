import { Auth } from "../../../components/auth/Auth";
import { Seo } from "../../../components/common/Seo";
import { AUTH_PROVIDER } from "../../../types/auth.types";

const Login = () => {
  return (
    <>
      <Seo />
      <Auth.Layout>
        <Auth.Header
          title="Log in to your account"
          description="to begin your journey 🚀"
        />
        <Auth.Providers providers={Object.values(AUTH_PROVIDER)} />
        <Auth.Divider />
        <Auth.Login />
      </Auth.Layout>
    </>
  );
};

export default Login;
