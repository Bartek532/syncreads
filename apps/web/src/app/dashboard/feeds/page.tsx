import { Feeds } from "../../../components/dashboard/feeds/feeds";

import { api } from "@/trpc/server";

const FeedsPage = async () => {
  const feeds = await api.user.getUserFeeds.query();
  return <Feeds feeds={feeds} />;
};

export default FeedsPage;
