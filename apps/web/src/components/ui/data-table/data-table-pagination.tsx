import { Button } from "@/components/ui/button";

import type { Table } from "@tanstack/react-table";


interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  const { pagination } = table.getState();
  const start = pagination.pageIndex * pagination.pageSize + 1;
  const total = table.getFilteredRowModel().rows.length;
  const end = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);

  return (
    <div className="flex items-center justify-between px-2">
      <p className="flex-1 text-sm text-muted-foreground">
        Showing <span className="font-medium">{start}</span> to{" "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{total}</span> results
      </p>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
