import Image from "next/image";

import { LANDING_REVIEWS } from "@/config";

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
                objectFit="cover"
                layout="fill"
                className="rounded-full"
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
    </section>
  );
};
