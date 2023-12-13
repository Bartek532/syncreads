import { Auth } from "@/components/auth/auth";
import { AUTH_PROVIDER } from "@/types/auth.types";

const quote = {
  content:
    '"I seem to have been only like a boy playing on the seashore, and diverting myself in now and then finding a smoother pebble or a prettier shell than ordinary, whilst the great ocean of truth lay all undiscovered before me."',
  author: "Isaac Newton",
};

const Register = () => {
  return (
    <>
      <Auth.Layout quote={quote}>
        <Auth.Header
          title="Register only once"
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
