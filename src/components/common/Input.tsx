import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"] & { isError?: boolean; isValidated?: boolean }
>(({ isError, isValidated, children, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {children}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          ref={ref}
          {...props}
          className={`block w-full rounded-md border-gray-300 py-2.5 px-4 transition ease-in-out focus:border-indigo-500 focus:ring-indigo-500
          sm:text-sm ${isError ? "border-red-500" : ""}`}
          type={props.type ?? "text"}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {isError ? (
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          ) : isValidated ? (
            <CheckCircleIcon
              className="h-5 w-5 text-green-500"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
});

Input.displayName = "Input";
