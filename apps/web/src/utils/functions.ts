import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { SyntheticEvent } from "react";

export function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };
}

export const nonNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

export const truncateTextByWordsCount = (text: string, wordsCount: number) => {
  const splittedText = text.split(" ");

  if (splittedText.length <= wordsCount) {
    return splittedText.join(" ");
  }

  return splittedText.slice(0, wordsCount).join(" ") + "...";
};

export const formatTime = (miliseconds: number) => {
  const seconds = Math.floor(miliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;
  const remainingMiliseconds = miliseconds % 1000;

  return (
    (hours > 0 ? `${hours}h ` : "") +
    (minutes > 0
      ? `${minutes}m `
      : hours > 0 && remainingSeconds > 0
      ? "0m "
      : "") +
    (remainingSeconds > 0
      ? `${remainingSeconds}${
          remainingMiliseconds > 0
            ? `.${remainingMiliseconds
                .toString()
                .padStart(3, "0")
                .replace(/0+$/, "")}`
            : ""
        }s `
      : "") +
    (remainingMiliseconds > 0 &&
    minutes === 0 &&
    hours === 0 &&
    remainingSeconds === 0
      ? `${remainingMiliseconds}ms`
      : "")
  );
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
