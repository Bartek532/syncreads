import { SettingsLayout } from "../../../components/dashboard/settings/layout/settings-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
