import { Reviews } from "@/components/landing/sections/reviews/reviews";

import { Contact } from "../../components/landing/sections/contact/contact";
import { Cta } from "../../components/landing/sections/cta/cta";
import { Faq } from "../../components/landing/sections/faq/faq";
import { Features } from "../../components/landing/sections/features/features";
import { Hero } from "../../components/landing/sections/hero/hero";

const Landing = () => {
  return (
    <>
      <Hero />
      <Features />
      <Reviews />
      <Faq />
      <Cta />
      <Contact />
    </>
  );
};

export default Landing;
