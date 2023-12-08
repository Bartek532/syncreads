import { redirect } from "next/navigation";

import { DashboardLayout } from "../../components/dashboard/layout/Layout";
import { supabase } from "../../utils/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/login");
  }

  return <DashboardLayout user={data.session.user}>{children}</DashboardLayout>;
}
