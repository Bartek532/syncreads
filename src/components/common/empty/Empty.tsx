import { memo } from "react";

interface EmptyProps {
  readonly children: React.ReactNode;
  readonly onCreateNew: () => void;
}

export const Empty = memo<EmptyProps>(({ children, onCreateNew }) => {
  return (
    <button
      type="button"
      className="relative mx-auto mt-6 block flex w-full max-w-6xl flex-col  items-center justify-center rounded-lg  border-2 border-dashed border-gray-300 p-16 px-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-6 lg:px-8"
      onClick={onCreateNew}
    >
      {children}
    </button>
  );
});

Empty.displayName = "Empty";
