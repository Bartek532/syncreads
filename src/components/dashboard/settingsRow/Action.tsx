import type { ReactNode } from "react";

interface ActionProps {
  readonly onClick?: () => void;
  readonly children: ReactNode;
}

export const Action = ({ onClick, children }: ActionProps) => (
  <button
    type="button"
    className="rounded-md bg-gray-100 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
    onClick={onClick}
  >
    {children}
  </button>
);
