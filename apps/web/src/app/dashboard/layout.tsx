import { redirect } from "next/navigation";

import { DashboardLayout } from "../../components/dashboard/layout/layout";
import { supabase } from "../../lib/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await supabase().auth.getUser();

  if (!data.user) {
    return redirect("/login");
  }

  return <DashboardLayout user={data.user}>{children}</DashboardLayout>;
}
