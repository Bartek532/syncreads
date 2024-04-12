import { ExploreIntegrationRemarkable } from "@/components/landing/explore/integrations/remarkable";

import { getMetadata } from "../../../../lib/metadata";

export const metadata = getMetadata({
  title: "reMarkable integration",
  description:
    "Make reMarkable truly remarkable. No more manual work - everything synced automatically. Focus on consuming and leave the rest to us.",
});

const ExploreRemarkablePage = () => {
  return <ExploreIntegrationRemarkable />;
};

export default ExploreRemarkablePage;
