import { AppearanceForm } from "@/components/dashboard/settings/appearance/appearance-form";
import { Separator } from "@/components/ui/separator";
import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Appearance - Settings",
});

const AppearanceSettingsPage = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-lg font-medium">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app.
        </p>
      </div>
      <Separator className="my-6" />
      <AppearanceForm />
    </div>
  );
};

export default AppearanceSettingsPage;
