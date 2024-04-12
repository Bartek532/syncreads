import { ExploreIntegrationRemarkable } from "@/components/landing/explore/integrations/remarkable";

import { getMetadata } from "../../../../lib/metadata";

export const metadata = getMetadata({
  title: "reMarkable integration",
});

const ExploreRemarkablePage = () => {
  return <ExploreIntegrationRemarkable />;
};

export default ExploreRemarkablePage;
