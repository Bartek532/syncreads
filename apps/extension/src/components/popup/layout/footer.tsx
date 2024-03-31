import { APP_NAME, APP_LINK } from "@rssmarkable/shared";

import logo from "@/assets/svg/logo.svg";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <img
          src={logo}
          alt="RSSmarkable logo"
          className="w-3.5 select-none opacity-70"
        />
        <span className="text-[0.65rem] text-muted-foreground">
          Powered by{" "}
          <a
            href={APP_LINK}
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
