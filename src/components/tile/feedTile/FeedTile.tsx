import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { useGenericLoader } from "../../../hooks/useGenericLoader";
import { truncateTextByWordsCount } from "../../../utils/functions";
import { trpc } from "../../../utils/trpc";
import { Checkbox } from "../../common/Checkbox";

interface FeedTileProps {
  readonly url: string;
  readonly isChecked: boolean;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FeedTile = memo<FeedTileProps>(({ url, onChange, isChecked }) => {
  const { data, isLoading } = trpc.feed.getFeedDetails.useQuery({
    url,
  });

  useGenericLoader(isLoading);

  if (!data) {
    return null;
  }

  return (
    <>
      <li className="flex items-center gap-4 md:gap-6">
        <Checkbox
          name={url}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onChange={onChange}
          isChecked={isChecked}
        />
        <div
          className={twMerge(
            "group relative flex w-full items-stretch gap-3 rounded-2xl bg-white pl-1 shadow focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 dark:bg-slate-800 md:pl-0",
            isChecked && "ring-2 ring-indigo-500 ring-offset-2",
          )}
        >
          <div
            className="hidden shrink-0 grow-0 basis-1/5 rounded-l-2xl bg-cover bg-center md:block"
            style={{ backgroundImage: `url(${data.feed.image ?? ""})` }}
          ></div>
          <div className="p-3 pr-12 md:py-4">
            <h3 className="text-base font-medium dark:text-white sm:text-lg">
              <a
                href={data.feed.url}
                className="focus:outline-none"
                target="_blank"
                rel="noreferrer"
              >
                {data.feed.title}
              </a>
            </h3>
            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              {truncateTextByWordsCount(data.feed.description ?? "", 15)}
            </p>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <ArrowUpRightIcon className="h-6 w-6" />
          </span>
        </div>
      </li>
    </>
  );
});

FeedTile.displayName = "FeedTile";
