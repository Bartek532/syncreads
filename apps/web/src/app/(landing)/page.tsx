import { Reviews } from "@/components/landing/sections/reviews/reviews";

import { Features } from "../../components/landing/sections/features/features";
import { Hero } from "../../components/landing/sections/hero/hero";

const Landing = () => {
  return (
    <>
      <Hero />
      <Features />
      <Reviews />
    </>
  );
};

export default Landing;
