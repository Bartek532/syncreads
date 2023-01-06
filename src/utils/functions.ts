import { TAILWIND_COLORS, TAILWIND_SATURATIONS } from "./consts";

import type { TailwindColor } from "./consts";
import type { SyntheticEvent } from "react";

export const parseHtml = (html: string) => {
  const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  let cleanHtml = html;
  while (SCRIPT_REGEX.test(cleanHtml)) {
    cleanHtml = cleanHtml.replace(SCRIPT_REGEX, "");
  }

  return cleanHtml;
};

export function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };
}

interface TailwindColorOptions {
  readonly prefix?: string;
  readonly range?: [number, number];
  readonly colors?: TailwindColor[];
}

export const generateTailwindColor = ({
  prefix = "bg",
  range = [0.5, 9],
  colors,
}: TailwindColorOptions) => {
  const randomColor = (colors ?? TAILWIND_COLORS)[
    Math.floor(Math.random() * (colors ?? TAILWIND_COLORS).length)
  ];

  const availableSaturations = TAILWIND_SATURATIONS.slice(
    TAILWIND_SATURATIONS.findIndex((sat) => sat === range[0] * 100),
    TAILWIND_SATURATIONS.findIndex((sat) => sat === range[1] * 100),
  );

  const randomSaturation =
    availableSaturations[
      Math.floor(Math.random() * availableSaturations.length)
    ];

  if (!randomColor || !randomSaturation) {
    throw new Error("Error occured when generating color1");
  }

  console.log(`${prefix}-${randomColor}-${randomSaturation}`);

  return `${prefix}-${randomColor}-${randomSaturation}`;
};
