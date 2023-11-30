import { api } from "../trpc/server";
import { IndexView } from "../views/index/Index";

const Home = async () => {
  const xd = await api.feed.getAllFeeds.query();
  return (
    <>
      {JSON.stringify(xd)}
      <IndexView />
    </>
  );
};

export default Home;
