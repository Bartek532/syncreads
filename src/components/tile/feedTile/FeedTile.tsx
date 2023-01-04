import { memo } from "react";

interface FeedTileProps {
  readonly url: string;
  readonly onDelete: ({ url }: { url: string }) => Promise<void>;
}

export const FeedTile = memo<FeedTileProps>(({ url, onDelete }) => {
  return (
    <div>
      {url}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
      <button onClick={() => onDelete({ url })}>Delete feed</button>
    </div>
  );
});

FeedTile.displayName = "FeedTile";
