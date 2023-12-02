import React, { memo } from "react";
import { twMerge } from "tailwind-merge";

export const Checkbox = memo<JSX.IntrinsicElements["input"]>(
  ({ name, onChange, checked = false, className, ...rest }) => {
    return (
      <input
        id={name}
        name={name}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        className={twMerge(
          "h-5 w-5 cursor-pointer rounded border-2 border-gray-300 bg-transparent text-indigo-600 focus:ring-indigo-500 md:h-6 md:w-6",
          className,
        )}
        {...rest}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";
