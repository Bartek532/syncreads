import { Seo } from "../components/common/Seo";
import { IndexView } from "../views/index/Index";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <IndexView />
    </>
  );
};

export default Home;
