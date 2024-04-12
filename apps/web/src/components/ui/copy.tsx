"use client";

import { CheckIcon, Copy as CopyIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";


import { cn, copyToClipboard, onPromise } from "../../utils";

import { Button } from "./button";

type CopyProps = {
  readonly text: string;
  readonly className?: string;
};

export const Copy = memo<CopyProps>(({ text, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = async () => {
    await copyToClipboard(text);
    setIsCopied(true);
  };

  return (
    <Button
      className={cn(
        "group h-8 w-8 p-2",
        isCopied && "border-success",
        className,
      )}
      variant="outline"
      onClick={onPromise(handleCopy)}
    >
      {isCopied ? (
        <CheckIcon className="w-full text-success" />
      ) : (
        <CopyIcon className="w-full" />
      )}
    </Button>
  );
});

Copy.displayName = "Copy";
