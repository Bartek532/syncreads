import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { LANDING_OPEN_SOURCE, LANDING_REVIEWS } from "@/config";

const OpenSource = () => {
  return (
    <div className="w-full animate-gradient rounded-3xl bg-gradient-to-r from-primary via-muted to-primary bg-[length:200%_auto] p-1 shadow-xl shadow-muted-foreground/60 dark:shadow-none">
      <div className="flex flex-col items-center justify-between gap-8 rounded-[1.25rem] bg-background px-8 py-9 md:flex-row md:gap-12 md:py-12">
        <div className="flex max-w-3xl flex-col gap-2">
          <h3 className="text-center text-xl font-bold sm:text-2xl md:text-left md:text-3xl">
            {LANDING_OPEN_SOURCE.title}
          </h3>
          <p className="md:text-md text-center text-sm text-muted-foreground md:text-left">
            {LANDING_OPEN_SOURCE.description}
          </p>
        </div>
        <a
          className={buttonVariants({ size: "lg" })}
          href={LANDING_OPEN_SOURCE.cta.href}
          target="_blank"
          rel="noreferrer"
        >
          {LANDING_OPEN_SOURCE.cta.text}
        </a>
      </div>
    </div>
  );
};

export const Reviews = () => {
  return (
    <section
      className="flex flex-col gap-6 py-12 md:gap-10 md:py-24 lg:gap-16 lg:py-32"
      id="reviews"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {LANDING_REVIEWS.title}
        </h2>
        <p className="mt-2 max-w-2xl text-center text-muted-foreground md:text-xl">
          {LANDING_REVIEWS.description}
        </p>
      </div>
      <figure className="flex flex-col items-center justify-center gap-6 md:gap-11 lg:gap-14">
        <blockquote className="mt-8 max-w-3xl text-center text-lg italic text-muted-foreground md:text-xl lg:text-2xl">
          {LANDING_REVIEWS.quote.content}
        </blockquote>
        <figcaption className="mt-2 flex flex-col gap-5 text-center text-sm md:gap-7">
          <div className="flex items-center justify-center gap-3 md:gap-5">
            <div className="relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
              <Image
                src={LANDING_REVIEWS.quote.author.avatar}
                alt={`${LANDING_REVIEWS.quote.author.name}'s avatar`}
                className="rounded-full object-cover"
                fill
              />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-md font-bold md:text-lg">
                {LANDING_REVIEWS.quote.author.name}
              </span>
              <span className="text-muted-foreground">
                {LANDING_REVIEWS.quote.author.position}
              </span>
            </div>
          </div>
        </figcaption>
      </figure>

      <div className="mt-14 lg:mt-20">
        <OpenSource />
      </div>
    </section>
  );
};
