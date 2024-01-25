import { Feeds } from "../../../components/dashboard/feeds/feeds";
import { getMetadata } from "../../../lib/metadata";

export const metadata = getMetadata({
  title: "Feeds",
});

const FeedsPage = () => {
  return <Feeds />;
};

export default FeedsPage;
