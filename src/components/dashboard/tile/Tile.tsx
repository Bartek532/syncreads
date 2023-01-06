import { memo } from "react";

import type { HeroIcon } from "src/utils/types";

interface Card {
  readonly title: string;
  readonly value: string | number;
  readonly icon: HeroIcon;
  readonly link: string;
  readonly href: string;
}

interface TileProps {
  readonly card: Card;
}

export const Tile = memo<TileProps>(({ card }) => {
  return (
    <div
      key={card.title}
      className="overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-500">
                {card.title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {card.value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a
            href={card.href}
            className="font-medium text-indigo-700 hover:text-indigo-900"
          >
            {card.link}
          </a>
        </div>
      </div>
    </div>
  );
});

Tile.displayName = "Tile";
