import { clsx } from "clsx";
import Image from "next/image";
import { memo } from "react";

interface CardProps {
  readonly title: string;
  readonly description: string;
  readonly imageSrc?: string;
  readonly className?: string;
  readonly isPriority?: boolean;
}

export const Card = memo(
  ({
    title,
    description,
    imageSrc,
    className,
    isPriority = false,
  }: CardProps) => {
    return (
      <div
        className={clsx(
          "w-full overflow-hidden rounded-2xl border border-gray-100/20 p-8 transition hover:bg-indigo-100 dark:hover:bg-gray-900/80",
          "flex flex-col items-center justify-start",
          className,
        )}
      >
        <h3 className="mb-4 w-full bg-clip-text text-2xl font-bold dark:text-white sm:text-3xl md:text-4xl">
          {title}
        </h3>
        <p className="mx-auto mt-4 text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>

        {imageSrc ? (
          <Image
            className="translate-y-1/3 scale-125"
            src={imageSrc}
            alt="Picture of the author"
            width={500}
            height={500}
            priority={isPriority}
          />
        ) : null}
      </div>
    );
  },
);

Card.displayName = "Card";
