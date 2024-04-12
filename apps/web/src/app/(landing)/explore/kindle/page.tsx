import { ExploreIntegrationKindle } from "@/components/landing/explore/integrations/kindle";

import { getMetadata } from "../../../../lib/metadata";

export const metadata = getMetadata({
  title: "Kindle integration",
});

const ExploreKindlePage = () => {
  return <ExploreIntegrationKindle />;
};

export default ExploreKindlePage;
