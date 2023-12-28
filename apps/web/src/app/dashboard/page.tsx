import { Home } from "../../components/dashboard/home/home";
import { getMetadata } from "../../lib/metadata";

export const metadata = getMetadata({
  title: "Dashboard",
});

const Dashboard = () => {
  return <Home />;
};

export default Dashboard;
