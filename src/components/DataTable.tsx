"use client";

import React, { useMemo, useState } from "react";
import { Pagination } from "@/src/components/Pagination";

type SortDirection = "asc" | "desc";

export type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: <K extends keyof T>(value: T[K], row: T) => React.ReactNode;
};

type DataTableProps<T extends Record<string, unknown>> = {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  total?: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  itemsPerPage = 10,
  total = 0,
  setPage,
  page=0,
  loading = false,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return sorted;
  }, [data, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(total / itemsPerPage));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSort = (key: keyof T, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column) => {
                  const isActive = sortKey === column.key;
                  const direction = isActive ? sortDirection : undefined;

                  return (
                    <th
                      key={String(column.key)}
                      scope="col"
                      onClick={() => handleSort(column.key, column.sortable)}
                      className={`px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#171717] ${
                        column.sortable ? "cursor-pointer select-none" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span>{column.header}</span>
                        {column.sortable && (
                          <span className="text-[10px] text-blue-600">
                            {direction === "asc" && "▲"}
                            {direction === "desc" && "▼"}
                            {!direction && "↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-sm text-slate-400"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                      <span>Loading data...</span>
                    </div>
                  </td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-6 text-center text-sm text-slate-400"
                  >
                    No data available.
                  </td>
                </tr>
              ) : (
                sortedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {columns.map((column) => {
                      const value = row[column.key];
                      const content = column.render
                        ? column.render(value as never, row)
                        : (value as React.ReactNode);

                      return (
                        <td
                          key={String(column.key)}
                          className="whitespace-nowrap px-4 py-3 text-[#171717]"
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-slate-500">
            Page {page + 1} of {pageCount}
          </p>
          <Pagination
            pageCount={pageCount}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
