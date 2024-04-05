import { APP_NAME } from "@syncreads/shared";

import { buttonVariants } from "@/components/ui/button";
import { env } from "@/lib/env";

export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-2 pb-9 pt-10">
      <p className="text-center text-[0.8rem]">
        To sync this page with {APP_NAME}, you need to log in or create a new
        account.
      </p>
      <a
        className={buttonVariants()}
        href={`${env.VITE_WEB_APP_URL}/auth/login`}
        target="_blank"
        rel="noreferrer"
      >
        Log in
      </a>
    </div>
  );
};
