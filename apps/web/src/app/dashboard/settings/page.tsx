import { redirect } from "next/navigation";

import { getMetadata } from "../../../lib/metadata";

export const metadata = getMetadata({
  title: "Settings",
});

const SettingsPage = () => {
  return redirect("/dashboard/settings/profile");
};

export default SettingsPage;
