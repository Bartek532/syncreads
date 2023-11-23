import { Seo } from "../components/common/Seo";
import { api } from "../trpc/server";
import { IndexView } from "../views/index/Index";

const Home = async () => {
  const xd = await api.feed.getAllFeeds.query();

  return (
    <>
      {JSON.stringify(xd)}
      <h1>Komponent</h1>
    </>
  );
};

export default Home;
