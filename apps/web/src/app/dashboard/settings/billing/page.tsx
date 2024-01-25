import { Bird } from "lucide-react";

import { getMetadata } from "@/lib/metadata";

import { Empty } from "../../../../components/ui/empty";

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
      <Empty
        icon={
          <Bird className="h-32 w-32 stroke-muted-foreground stroke-[0.5px] text-muted-foreground" />
        }
        title="Our app is completely free!"
      />
    </div>
  );
};

export default BillingSettingsPage;
