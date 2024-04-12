import { Reviews } from "@/components/landing/home/reviews/reviews";

import { Contact } from "../../components/landing/home/contact/contact";
import { Cta } from "../../components/landing/home/cta/cta";
import { Faq } from "../../components/landing/home/faq/faq";
import { Features } from "../../components/landing/home/features/features";
import { Hero } from "../../components/landing/home/hero/hero";

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
