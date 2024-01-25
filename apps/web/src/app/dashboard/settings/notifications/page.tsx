import { TrafficCone } from "lucide-react";

import { getMetadata } from "@/lib/metadata";

import { Empty } from "../../../../components/ui/empty";

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
      <Empty
        icon={
          <TrafficCone className="h-32 w-32 stroke-muted-foreground stroke-[0.5px] text-muted-foreground" />
        }
        title="Notifications are coming soon!"
      />
    </div>
  );
};

export default NotificationsSettingsPage;
