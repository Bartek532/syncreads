import clsx from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & { isSecondary?: boolean }
>(({ isSecondary, children, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
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
