import { ExploreIntegrationExtension } from "@/components/landing/explore/integrations/extension";

import { getMetadata } from "../../../../lib/metadata";

export const metadata = getMetadata({
  title: "Browser extension",
});

const ExploreExtensionPage = () => {
  return <ExploreIntegrationExtension />;
};

export default ExploreExtensionPage;
