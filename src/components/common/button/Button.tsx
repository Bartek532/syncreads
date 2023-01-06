import clsx from "clsx";
import { memo } from "react";

export const Button = memo<
  JSX.IntrinsicElements["button"] & { isSecondary?: boolean }
>(({ isSecondary, children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        isSecondary
          ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          : "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
      )}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
