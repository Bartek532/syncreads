import { getMetadata } from "@/lib/metadata";

export const metadata = getMetadata({
  title: "Billing - Settings",
});

const BillingSettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-medium">Billing</h2>
        <p className="text-sm text-muted-foreground">
          Manage your billing information.
        </p>
      </div>
    </div>
  );
};

export default BillingSettingsPage;
