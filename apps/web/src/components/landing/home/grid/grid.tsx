"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { ThemedImage } from "@/components/ui/themed-image";
import { APP_IMAGE } from "@/config";

import { ThemeSwitch } from "./theme-switch";

export const Grid = () => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="fixed left-1/2 top-3 z-50 flex -translate-x-1/2 items-center justify-center gap-1">
        <div className="grid grid-cols-3 items-center justify-items-center rounded-3xl border border-input bg-background px-4 py-1 shadow-xl">
          <span className="block w-fit text-xs font-semibold">Grid</span>
          <Switch
            className="scale-75"
            checked={isImageOpen}
            onCheckedChange={(checked) => setIsImageOpen(!!checked)}
          />
          <span className="text-xs font-semibold">Image</span>
        </div>
        <div className="scale-[0.85] overflow-hidden rounded-full shadow-xl">
          <ThemeSwitch />
        </div>
      </div>

      {isImageOpen ? (
        <ThemedImage
          src={APP_IMAGE}
          defaultVariant="light"
          alt=""
          className="mt-16 w-full max-w-7xl rounded-lg"
          width={2717}
          height={2038}
        />
      ) : (
        <div className="mt-16 grid w-full max-w-xl grid-cols-2 gap-3 rounded-xl bg-muted p-3 md:max-w-7xl md:grid-cols-4 md:gap-4 md:p-4 lg:gap-5 lg:p-5 [&>*]:rounded-xl [&>*]:bg-background">
          <div className="aspect-4/3 order-1 md:order-2"></div>
          <div className="aspect-4/6 order-2 row-span-2 md:order-1 md:aspect-auto"></div>
          <div className="aspect-4/6 order-3 row-span-2 md:order-4 md:aspect-auto"></div>
          <div className="aspect-4/3 order-4 md:order-3"></div>
          <div className="aspect-4/3 order-5 col-span-2 row-span-2 hidden md:block"></div>
          <div className="aspect-8/3 order-6 col-span-2 md:order-8"></div>
          <div className="aspect-4/3 order-7 md:order-6"></div>
          <div className="order-8 row-span-2 md:order-7"></div>
          <div className="aspect-4/3 order-9 md:aspect-auto"></div>
        </div>
      )}
    </div>
  );
};
