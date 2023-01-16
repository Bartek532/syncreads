import { twMerge } from "tailwind-merge";

import { Panel } from "./Panel";

import type { ChangeEvent } from "react";

interface TabsProps {
  readonly labels: string[];
  readonly index: number;
  readonly onChange: (index: number) => void;
}

export const Tabs = ({ labels, index, onChange }: TabsProps) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    if (!Number.isNaN(value)) {
      onChange(value);
    }
  };

  return (
    <>
      <select
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 sm:text-sm md:hidden"
        aria-label="Select a tab"
        value={index}
        onChange={handleSelectChange}
      >
        {labels.map((label, i) => (
          <option key={i} value={i}>
            {label}
          </option>
        ))}
      </select>
      <ul className="hidden space-x-8 border-b border-gray-200 md:flex">
        {labels.map((label, i) => (
          <li
            key={i}
            className={twMerge(
              "cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
              i === index
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            )}
            onClick={() => onChange(i)}
          >
            {label}
          </li>
        ))}
      </ul>
    </>
  );
};

Tabs.Panel = Panel;
