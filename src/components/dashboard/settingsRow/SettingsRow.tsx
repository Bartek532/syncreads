import { Action } from "./Action";

import type { ReactNode } from "react";

interface SettingsRowProps {
  readonly leftSection?: ReactNode;
  readonly middleSection?: ReactNode;
  readonly rightSection?: ReactNode;
}

export const SettingsRow = ({
  leftSection,
  middleSection,
  rightSection,
}: SettingsRowProps) => (
  <li className="py-4 text-sm sm:grid sm:h-16 sm:grid-cols-3 sm:gap-4 sm:py-0">
    <div className="flex items-center font-medium text-gray-500">
      {leftSection}
    </div>
    <div className="mt-1 flex items-center sm:col-span-2 sm:mt-0">
      <div className="grow text-gray-800">{middleSection}</div>
      <div className="ml-2.5 flex-shrink-0 font-medium">{rightSection}</div>
    </div>
  </li>
);

SettingsRow.Action = Action;
