import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/dashboard/settings/profile/profile-form";
import { Separator } from "@/components/ui/separator";
import { getMetadata } from "@/lib/metadata";
import { supabase } from "@/lib/supabase/server";

export const metadata = getMetadata({
  title: "Profile - Settings",
});

const ProfileSettingsPage = async () => {
  const { data } = await supabase().auth.getUser();

  if (!data.user) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-lg font-medium">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator className="my-6" />
      <ProfileForm user={data.user} />
    </div>
  );
};

export default ProfileSettingsPage;
