import { Navigation } from "./navigation";

export const Header = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter md:text-5xl xl:text-6xl">
          Explore
        </h1>
        <p className="text-center text-muted-foreground">
          Pick the integration to see how you can benefit from it.
        </p>
      </div>
      <Navigation />
    </>
  );
};
