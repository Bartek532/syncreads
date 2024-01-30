import { Features } from "../components/index/Features";
import { Footer } from "../components/index/Footer";
import { GetStartedSteps } from "../components/index/GetStartedSteps";
import { Hero } from "../components/index/Hero";
import { Layout } from "../components/index/Layout";
import { Nav } from "../components/index/Nav";
import { OpenSource } from "../components/index/OpenSource";

const Home = () => {
  return (
    <Layout>
      <Nav />
      <Hero />
      <Features />
      <GetStartedSteps />
      <OpenSource />
      <Footer />
    </Layout>
  );
};

export default Home;
