import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center py-16">
      <Loader2 className="animate-spin" />
    </div>
  );
};
