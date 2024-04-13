import { ThemedImage } from "@/components/ui/themed-image";

import { FEATURES } from "../../constants/integrations";

export const Features = () => {
  const featured = FEATURES[0];

  if (!featured) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center gap-1">
        <h3
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          id="features"
        >
          Features
        </h3>
        <p className="text-center text-muted-foreground">
          See overview of what we can do together.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col gap-4 md:mt-10 md:gap-6 lg:mt-16">
        <div className="flex w-full flex-col gap-10 rounded-lg bg-muted px-6 pt-6 sm:px-8 sm:pt-8 md:px-10 md:pt-10">
          <div className="flex flex-col items-start justify-center gap-2">
            <featured.icon className="mb-2 h-8 w-8" />
            <h4 className="text-xl font-bold tracking-tighter md:text-2xl lg:text-3xl">
              {featured.title}
            </h4>
            <p className="max-w-lg">{featured.description}</p>
          </div>
          <ThemedImage
            src={featured.image}
            defaultVariant="light"
            alt="sync article"
            width={1800}
            height={1200}
            className="rounded-t-lg"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {FEATURES.slice(1).map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-12 rounded-lg bg-muted p-6 sm:p-8 md:p-10 lg:gap-16"
            >
              <div className="flex flex-col items-start justify-center gap-1">
                <feature.icon className="mb-2 h-7 w-7" />
                <h4 className="text-xl font-bold tracking-tighter md:text-2xl">
                  {feature.title}
                </h4>
                <p>{feature.description}</p>
              </div>
              <ThemedImage
                className="my-2 w-full max-w-xs self-center"
                src={feature.image}
                defaultVariant="light"
                width={370}
                height={215}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
