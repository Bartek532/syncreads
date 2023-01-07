import { ArrowUpRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { memo } from "react";

import { onPromise } from "src/utils/functions";
import { trpc } from "src/utils/trpc";

interface FeedTileProps {
  readonly url: string;
  readonly onDelete: ({ url }: { url: string }) => Promise<void>;
}

export const FeedTile = memo<FeedTileProps>(({ url, onDelete }) => {
  const { origin } = new URL(url);

  const { data } = trpc.feed.getWebsiteDetails.useQuery({
    url: origin,
  });

  if (!data) {
    return null;
  }

  return (
    <article
      key={url}
      className="group relative flex rounded-2xl bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
    >
      <div
        className="w-1/3 shrink-0 rounded-l-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${data.details.images[0]})` }}
      ></div>
      <div className="p-6 pr-16">
        <h3 className="text-base font-medium sm:text-lg">
          <a
            href={data.details.url}
            className="focus:outline-none"
            target="_blank"
            rel="noreferrer"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {data.details.title}
          </a>
        </h3>
        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          {data.details.description}
        </p>
      </div>
      <span
        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <ArrowUpRightIcon className="h-6 w-6" />
      </span>

      <button
        className="absolute bottom-6 right-6 text-gray-300 hover:text-red-400"
        onClick={onPromise(() => onDelete({ url }))}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </article>
  );
});

FeedTile.displayName = "FeedTile";
