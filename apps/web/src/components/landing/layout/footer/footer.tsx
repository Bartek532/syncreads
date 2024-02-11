import { REPOSITORY_URL, TWITTER_URL } from "@/config";

export const Footer = () => {
  return (
    <footer className="flex justify-center bg-background">
      <div className="flex w-full max-w-[84rem] items-center justify-between gap-10 px-6 py-4 sm:px-8 md:py-7">
        <span className="text-sm">
          &copy; 2024 RSSmarkable. All rights reserved.
        </span>

        <div className="flex flex-row gap-3">
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline hover:no-underline"
          >
            Github
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline hover:no-underline"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};
