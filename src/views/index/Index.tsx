import { Features } from "../../components/index/Features";
import { Footer } from "../../components/index/Footer";
import { GetStartedSteps } from "../../components/index/GetStartedSteps";
import { Hero } from "../../components/index/Hero";
import { Layout } from "../../components/index/Layout";
import { Nav } from "../../components/index/Nav";

export const IndexView = () => {
  return (
    <Layout>
      <Nav />
      <Hero />
      <Features />
      <GetStartedSteps />
      <Footer />
    </Layout>
  );
};
