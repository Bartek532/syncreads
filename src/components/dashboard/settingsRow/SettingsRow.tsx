import { useState } from "react";

import { Button, BUTTON_VARIANT } from "../../common/Button";
import { Input } from "../../common/Input";

import type { HTMLInputTypeAttribute } from "react";

interface SettingsRowProps {
  readonly label: string;
  readonly content?: string;
  readonly contentType?: HTMLInputTypeAttribute;
  readonly onChange: (content: string) => void;
}

export const SettingsRow = ({
  label,
  content,
  contentType,
  onChange,
}: SettingsRowProps) => {
  const [value, setValue] = useState(content ?? "");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleButtonClick = () => {
    onChange(value);
    setIsEditMode(false);
  };

  return (
    <li className="py-4 text-sm sm:grid sm:h-16 sm:grid-cols-3 sm:gap-4 sm:py-0">
      <div className="flex items-center font-medium text-gray-500">{label}</div>
      <div className="mt-1 flex items-center sm:col-span-2 sm:mt-0">
        <div className="grow text-gray-800">
          {isEditMode ? (
            <Input
              type={contentType ?? "text"}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          ) : (
            content
          )}
        </div>
        <div className="ml-2.5 flex-shrink-0 font-medium">
          {isEditMode ? (
            <Button type="button" onClick={handleButtonClick}>
              Save
            </Button>
          ) : (
            <Button
              type="button"
              variant={BUTTON_VARIANT.TEXT}
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};
