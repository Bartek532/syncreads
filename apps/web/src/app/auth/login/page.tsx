import { redirect } from "next/navigation";

import { Auth } from "@/components/auth/auth";
import { supabase } from "@/lib/supabase/server";
import { AUTH_PROVIDER } from "@/types/auth.types";

import { getMetadata } from "../../../lib/metadata";

const quote = {
  content:
    "Any intelligent fool can make things bigger, more complex, and more violent. It takes a touch of genius - and a lot of courage - to move in the opposite direction.",
  author: "Albert Einstein",
};

export const metadata = getMetadata({
  title: "Login",
});

const Login = async () => {
  const { data } = await supabase().auth.getUser();

  if (data.user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <Auth.Layout quote={quote}>
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
