import Image from "next/image";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface CardImageConfig {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly isPriority?: boolean;
}

interface CardProps {
  readonly title: string;
  readonly description: string;
  readonly className?: string;
  readonly imageConfig?: CardImageConfig;
}

export const Card = memo(
  ({ title, description, className, imageConfig }: CardProps) => {
    return (
      <div
        className={twMerge(
          "w-full overflow-hidden rounded-2xl border border-gray-100/20 p-8 transition hover:bg-indigo-100 dark:hover:bg-gray-900/80",
          "flex flex-col items-center justify-start",
          className,
        )}
      >
        <h3 className="text-md mb-4 w-full bg-clip-text text-xl font-medium dark:text-white sm:text-3xl md:text-3xl">
          {title}
        </h3>
        <p className="mx-auto text-lg text-slate-600 dark:text-slate-400 sm:mt-4">
          {description}
        </p>

        {imageConfig ? (
          <Image
            className="translate-y-1/3 scale-125"
            alt={imageConfig.alt}
            src={imageConfig.src}
            width={imageConfig.width}
            height={imageConfig.height}
            priority={imageConfig.isPriority}
          />
        ) : null}
      </div>
    );
  },
);

Card.displayName = "Card";
