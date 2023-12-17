"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { SyncStatus, SyncTrigger } from "@rssmarkable/database";

import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SYNCS_PAGINATION_PER_PAGE_OPTIONS } from "@/config/sync";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("trigger") && (
          <DataTableFacetedFilter
            column={table.getColumn("trigger")}
            title="Trigger"
            options={Object.values(SyncTrigger).map((status) => ({
              label: status,
              value: status,
            }))}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={Object.values(SyncStatus).map((status) => ({
              label: status,
              value: status,
            }))}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {SYNCS_PAGINATION_PER_PAGE_OPTIONS.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
