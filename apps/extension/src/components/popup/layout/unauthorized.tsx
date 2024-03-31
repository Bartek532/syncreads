import { APP_NAME } from "@rssmarkable/shared";

import { buttonVariants } from "@/components/ui/button";

export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-2 pb-9 pt-10">
      <p className="text-center text-[0.8rem]">
        To save this page to {APP_NAME}, you need to log in or create a new
        account.
      </p>
      <a
        className={buttonVariants()}
        href="https://rssmarkable.vercel.app"
        target="_blank"
      >
        Log in
      </a>
    </div>
  );
};
