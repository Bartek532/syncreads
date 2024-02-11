import Image from "next/image";

import { Sparkles } from "@/components/ui/sparkles";
import { LANDING_FEATURES } from "@/config";
import { cn } from "@/utils";

export const Features = () => {
  return (
    <section
      className="!col-span-full grid grid-cols-subgrid bg-muted py-12 md:py-24 lg:py-32"
      id="about"
    >
      <div className="col-start-2 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {LANDING_FEATURES.title.base}{" "}
          <Sparkles>{LANDING_FEATURES.title.sparkling}</Sparkles>
        </h2>
        <p className="mt-2 max-w-2xl text-center text-muted-foreground md:text-xl">
          {LANDING_FEATURES.description}
        </p>
      </div>

      <ul className="col-start-2 mt-14 flex flex-col gap-16 md:mt-24 md:gap-28">
        {LANDING_FEATURES.list.map((feature, index) => (
          <li
            className={cn(
              "flex flex-col items-center gap-4 sm:flex-row md:gap-12",
              index % 2 !== 0
                ? "sm:flex-row-reverse sm:justify-between"
                : "sm:flex-row",
            )}
            key={feature.title}
          >
            <div>
              <Image
                src={feature.image}
                alt=""
                className="rounded-lg object-cover shadow"
                width={900}
                height={600}
              />
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:w-1/2">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                {feature.title}
              </h3>
              <p className="max-w-md text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
