import { APP_NAME } from "@syncreads/shared";

import { ExploreIntegrationKindle } from "@/components/landing/explore/integrations/kindle";

import { getMetadata } from "../../../../lib/metadata";

export const metadata = getMetadata({
  title: "Kindle integration",
  description: `Connect your Kindle to ${APP_NAME}. Stop losing your highlights and focus. Organize everything in one place, without any distractions.`,
});

const ExploreKindlePage = () => {
  return <ExploreIntegrationKindle />;
};

export default ExploreKindlePage;
