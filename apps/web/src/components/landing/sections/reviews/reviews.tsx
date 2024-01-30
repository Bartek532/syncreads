import { LANDING_REVIEWS } from "@/config";

export const Reviews = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32" id="reviews">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {LANDING_REVIEWS.title}
        </h2>
        <p className="mt-2 max-w-2xl text-center text-muted-foreground md:text-xl">
          {LANDING_REVIEWS.description}
        </p>
      </div>
    </section>
  );
};
