import { useState } from "react";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { SettingsRow } from "../settingsRow/SettingsRow";

import type { HTMLInputTypeAttribute } from "react";

interface UserSettingsRowProps {
  readonly name: string;
  readonly type: HTMLInputTypeAttribute;
  readonly initValue?: string;
}

export const UserSettingsRow = ({
  name,
  type,
  initValue,
}: UserSettingsRowProps) => {
  const [value, setValue] = useState(initValue);
  const [editMode, setEditMode] = useState(false);

  const handleSaveButtonClick = () => {
    console.log("saving...");
    setEditMode(false);
  };

  return (
    <SettingsRow
      leftSection={name}
      middleSection={
        <>
          {editMode ? (
            <Input
              type={type}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          ) : (
            value
          )}
        </>
      }
      rightSection={
        <>
          {editMode ? (
            <Button type="button" onClick={handleSaveButtonClick}>
              Save
            </Button>
          ) : (
            <SettingsRow.Action onClick={() => setEditMode(true)}>
              Edit
            </SettingsRow.Action>
          )}
        </>
      }
    />
  );
};
