import { APP_NAME } from "@syncreads/shared";

import logo from "@/assets/svg/logo.svg";
import { env } from "@/lib/env";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <img
          src={logo}
          alt="SyncReads logo"
          className="w-3.5 select-none opacity-70"
        />
        <span className="text-[0.65rem] text-muted-foreground">
          Powered by{" "}
          <a
            href={env.VITE_WEB_APP_URL}
            target="_blank"
            className="underline hover:no-underline"
          >
            {APP_NAME}
          </a>
        </span>
      </div>
    </div>
  );
};
