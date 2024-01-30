export const Features = () => {
  return (
    <section
      className="grid-cols-subgrid !col-span-full -mx-6 grid bg-muted px-6 py-12 sm:-mx-8 sm:px-8 md:py-24 lg:py-32"
      id="features"
    >
      <div className="col-start-2 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          See the magic
        </h2>
        <p className="mt-2 max-w-2xl text-center text-muted-foreground md:text-xl">
          Experience the features the users love.
        </p>
      </div>

      <ul>
        <li>
          <div></div>
          <div>
            <h3>Simple</h3>
            <p>
              You need only 5 clicks to do full setup and sync your first
              article. Configure once, use forever.
            </p>
          </div>
        </li>
        <div>
          <div></div>
          <h3>Fast</h3>
          <p>
            Average sync time is less than 5 seconds. We use the latest
            technologies to ensure your data is always up to date.
          </p>
        </div>
        <div>
          <div></div>
          <h3>Reliable</h3>
          <p>
            Downtime is not an option. It&apos;s our top priority to provide you
            the best possible experience.
          </p>
        </div>
      </ul>
    </section>
  );
};
