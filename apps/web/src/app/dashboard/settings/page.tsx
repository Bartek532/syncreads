import { Settings } from "../../../components/dashboard/settings/Settings";
import { getMetadata } from "../../../lib/metadata";

export const metadata = getMetadata({
  title: "Settings",
});

const SettingsPage = () => {
  return <Settings />;
};

export default SettingsPage;
