import { PRICING_MODEL } from "@/components/landing/pricing/constants";
import { STARTER_PLAN } from "@/components/landing/pricing/constants/starter";
import { Pricing } from "@/components/landing/pricing/pricing";
import { supabase } from "@/lib/supabase/server";

import { getMetadata } from "../../../lib/metadata";
import { getPricingPlans } from "../../../server/services/payment/subscription.service";

export const metadata = getMetadata({
  title: "Pricing",
  description: "What works for you? Choose a plan that fits your needs.",
});

const PricingPage = async () => {
  const {
    data: { user },
  } = await supabase().auth.getUser();
  const plans = await getPricingPlans({
    type: PRICING_MODEL,
  });

  const sortedPlans = plans.sort((a, b) => a.order - b.order);
  const allPlans = [STARTER_PLAN, ...sortedPlans];

  return <Pricing plans={allPlans} user={user} />;
};

export default PricingPage;
