import { Loader2 } from "lucide-react";

const SyncLoading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span>Loading...</span>
    </div>
  );
};

export default SyncLoading;
