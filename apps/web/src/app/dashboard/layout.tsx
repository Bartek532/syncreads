import { redirect } from "next/navigation";

import { DashboardLayout } from "../../components/dashboard/layout/layout";
import { supabase } from "../../lib/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await supabase().auth.getUser();

  console.log(data);

  if (!data.user) {
    return redirect("/auth/login");
  }

  return <DashboardLayout user={data.user}>{children}</DashboardLayout>;
}
