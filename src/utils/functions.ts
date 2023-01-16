import type { SyntheticEvent } from "react";

export function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };
}

export const generateRandomColor = (palette: string[]) => {
  return palette[Math.floor(Math.random() * palette.length)];
};

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
