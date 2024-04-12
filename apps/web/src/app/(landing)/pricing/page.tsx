import { Pricing } from "@/components/landing/pricing/pricing";

import { getMetadata } from "../../../lib/metadata";

export const metadata = getMetadata({
  title: "Pricing",
  description: "What works for you? Choose a plan that fits your needs.",
});

const PricingPage = () => {
  return <Pricing />;
};

export default PricingPage;
