import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Notifications - Settings",
});

const NotificationsSettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-medium">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
    </div>
  );
};

export default NotificationsSettingsPage;
