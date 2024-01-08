import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Profile - Settings",
});

const ProfileSettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-medium">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
