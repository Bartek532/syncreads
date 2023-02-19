import React, { memo } from "react";

interface CheckboxProps {
  readonly name: string;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly isChecked?: boolean;
}

export const Checkbox = memo<CheckboxProps>(
  ({ name, onChange, isChecked = false }) => {
    return (
      <input
        id={name}
        name={name}
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
        className="h-5 w-5 cursor-pointer rounded border-2 border-gray-300 bg-transparent text-indigo-600 focus:ring-indigo-500 md:h-6 md:w-6"
      />
    );
  },
);

Checkbox.displayName = "Checkbox";
