import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface CardImageConfig {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt?: string;
  readonly isPriority?: boolean;
}

interface CardProps {
  readonly title: string;
  readonly description: string;
  readonly className?: string;
  readonly image?: CardImageConfig;
}

export const Card = ({ title, description, className, image }: CardProps) => {
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

      {image ? (
        <Image
          className="translate-y-1/3 scale-125"
          alt={image.alt ?? ""}
          src={image.src}
          width={image.width}
          height={image.height}
          priority={image.isPriority}
        />
      ) : null}
    </div>
  );
};

Card.displayName = "Card";
