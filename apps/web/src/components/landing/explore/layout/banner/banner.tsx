export const Banner = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg px-8 py-6">
      <h3 className="text-center text-lg font-semibold text-primary md:text-xl lg:text-2xl">
        Your data is safe with us.
      </h3>
      <p className="max-w-xl text-center text-sm text-muted-foreground">
        We&apos;re committed to protecting your data and privacy. That&apos; why
        we&apos;re not modyfing any data on final device. It&apos;s all about
        consuming, not burning, isn&apos;t it?
      </p>
    </div>
  );
};
