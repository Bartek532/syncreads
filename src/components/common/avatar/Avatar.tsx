import { memo } from "react";

import AvatarIcon from "public/svg/avatar.svg";
import { generateTailwindColor } from "src/utils/functions";

interface AvatarProps {
  readonly image?: string | null | undefined;
  readonly name?: string | null | undefined;
  readonly size?: number;
}

export const Avatar = memo<AvatarProps>(({ image, name, size = 16 }) => {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`h-${size} w-${size} rounded-full`}
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    );
  }

  if (name) {
    return (
      <span
        className={`inline-flex text-[${
          size * 10
        }%] h-${size} w-${size} items-center justify-center rounded-full ${generateTailwindColor(
          {},
        )}`}
      >
        <span className="font-medium leading-none text-white">{name[0]}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-block h-${size} w-${size} overflow-hidden rounded-full bg-gray-100`}
    >
      <AvatarIcon className="h-full w-full text-gray-300" />
    </span>
  );
});

Avatar.displayName = "Avatar";
