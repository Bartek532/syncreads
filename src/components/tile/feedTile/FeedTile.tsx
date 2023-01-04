import { memo } from "react";

interface FeedTileProps {
  readonly url: string;
  readonly onDelete: ({ url }: { url: string }) => void;
}

export const FeedTile = memo<FeedTileProps>(({ url, onDelete }) => {
  return (
    <div>
      {url}
      <button onClick={() => onDelete({ url })}>Delete feed</button>
    </div>
  );
});

FeedTile.displayName = "FeedTile";
