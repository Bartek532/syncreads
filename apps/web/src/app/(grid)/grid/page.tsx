"use client";

import { useState } from "react";

import { Checkbox } from "../../../components/ui/checkbox";
import { ThemedImage } from "../../../components/ui/themed-image";
import { APP_IMAGE } from "../../../config";

const GridPage = () => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  return (
    <div className="relative w-full">
      <Checkbox
        className="absolute right-4 top-4 h-10 w-10"
        checked={isImageOpen}
        onCheckedChange={(checked) => setIsImageOpen(!!checked)}
      />
      {isImageOpen ? (
        <ThemedImage
          src={APP_IMAGE}
          defaultVariant="light"
          alt=""
          className="w-full rounded-lg"
          width={2717}
          height={2038}
        />
      ) : (
        <div className="grid h-64 w-full grid-cols-4 gap-10 bg-muted p-10">
          <div className="h-20 rounded-lg bg-primary"></div>
          <div className="h-20 rounded-lg bg-primary"></div>
          <div className="h-20 rounded-lg bg-primary"></div>
          <div className="h-20 rounded-lg bg-primary"></div>
        </div>
      )}
    </div>
  );
};

export default GridPage;
