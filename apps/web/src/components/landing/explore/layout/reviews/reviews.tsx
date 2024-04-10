import { Star } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

import { cn } from "@/utils";

type ReviewsProps = {
  readonly rating: number;
  readonly description: string;
  readonly users: {
    readonly color: string;
    readonly avatar: string;
  }[];
};

const MAX_RATING = 5;

export const Reviews = memo<ReviewsProps>(({ rating, description, users }) => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex items-center">
        {users.map((user, index) => (
          <div
            key={user.avatar}
            className={cn(
              "relative flex aspect-square w-14 items-center justify-center rounded-full border-2 border-primary-foreground bg-primary-foreground bg-opacity-10 transition-colors duration-300 ease-in-out hover:bg-opacity-20",
              user.color,
              index > 0 && "-ml-4",
            )}
          >
            <Image
              key={user.avatar}
              src={user.avatar}
              width={32}
              height={32}
              className="w-6 rounded-full"
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <div className="flex gap-1">
          {Array.from({ length: MAX_RATING }).map((_, index) => (
            <Star
              key={index}
              size={20}
              className={cn(
                index < rating
                  ? "fill-warning stroke-warning"
                  : "fill-warning/50 stroke-warning/30",
              )}
            />
          ))}
        </div>
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
});

Reviews.displayName = "Reviews";
