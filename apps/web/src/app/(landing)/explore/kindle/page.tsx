import { ExploreIntegrationKindle } from "@/components/landing/explore/integrations/kindle";

import { getMetadata } from "../../../../lib/metadata";

export const metadata = getMetadata({
  title: "Kindle integration",
  description:
    "Connect your Kindle to SyncReads. Stop losing your highlights and focus. Organize everything in one place, without any distractions.",
});

const ExploreKindlePage = () => {
  return <ExploreIntegrationKindle />;
};

export default ExploreKindlePage;
