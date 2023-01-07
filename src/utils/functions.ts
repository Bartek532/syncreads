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
