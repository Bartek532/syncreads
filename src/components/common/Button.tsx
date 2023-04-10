import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const variants = [
  {
    name: "primary",
    className:
      "border-transparent bg-indigo-600 text-white enabled:hover:bg-indigo-700",
  },
  {
    name: "secondary",
    className:
      "border-gray-300 bg-white text-gray-700 enabled:hover:bg-gray-50",
  },
  {
    name: "danger",
    className:
      "border-transparent bg-red-600 text-white enabled:hover:bg-red-700 focus:ring-red-500",
  },
] as const;

export const Button = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & {
    variant?: (typeof variants)[number]["name"];
  }
>(({ variant = "primary", children, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={twMerge(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50",
        variants.find(({ name }) => variant === name)?.className,
        props.className,
      )}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
