"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

import type { ComponentProps } from "react";

type ThemedImageProps<T extends string> = Omit<
  ComponentProps<typeof Image>,
  "src"
> & {
  readonly src: { [K in T]: string };
  readonly defaultVariant: T;
};

const isSupported = <T extends string>(
  src: { [K in T]: string },
  theme: string | undefined,
): theme is T => {
  return !!(theme && theme in src);
};

export const ThemedImage = <T extends string>({
  src,
  defaultVariant,
  alt,
  ...delegated
}: ThemedImageProps<T>) => {
  const { resolvedTheme } = useTheme();
  const source = isSupported(src, resolvedTheme)
    ? src[resolvedTheme]
    : src[defaultVariant];

  return <Image src={source} alt={alt} {...delegated} />;
};
