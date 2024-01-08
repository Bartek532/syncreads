import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Appearance - Settings",
});

const AppearanceSettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-medium">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app.
        </p>
      </div>
    </div>
  );
};

export default AppearanceSettingsPage;
