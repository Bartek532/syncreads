import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps<T extends FieldValues> = JSX.IntrinsicElements["input"] & {
  name: Path<T>;
  control: Control<T>;
  children: React.ReactNode;
};

export const Input = <T extends FieldValues>({
  name,
  control,
  children,
  ...props
}: InputProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {children}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...props}
          className={twMerge(
            "block w-full rounded-md border-gray-300 py-2.5 px-4 transition ease-in-out focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm",
            fieldState.error && "border-red-500",
          )}
          type={props.type ?? "text"}
          value={field.value}
          onChange={field.onChange}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {fieldState.error ? (
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          ) : fieldState.isDirty ? (
            <CheckCircleIcon
              className="h-5 w-5 text-green-500"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>
      {fieldState.error && (
        <p className="mt-1 text-xs text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};
