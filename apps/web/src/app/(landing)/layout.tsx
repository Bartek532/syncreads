import { LandingLayout } from "../../components/landing/layout/layout";
import { supabase } from "../../lib/supabase/client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await supabase().auth.getUser();

  return (
    <LandingLayout {...(data.user && { user: data.user })}>
      {children}
    </LandingLayout>
  );
}
