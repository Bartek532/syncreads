import Link from "next/link";

import { LANDING_CTA } from "../../../../config";
import { cn } from "../../../../utils";
import { buttonVariants } from "../../../ui/button";

export const Cta = () => {
  return (
    <section
      className="flex flex-col gap-6 py-20 md:gap-10 md:py-32 lg:gap-16 lg:py-44"
      id="cta"
    >
      <div className="lg:gap-18 flex flex-col items-center gap-10 md:gap-16">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {LANDING_CTA.title}
        </h2>

        <Link
          href="/auth/register"
          className={cn(buttonVariants({ size: "lg" }), "text-md py-6")}
        >
          {LANDING_CTA.button}
        </Link>
      </div>
    </section>
  );
};
