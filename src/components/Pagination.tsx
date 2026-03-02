"use client";

import React from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={handlePageChange}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName="flex items-center gap-1 text-xs select-none"
      pageClassName="inline-flex"
      pageLinkClassName="px-2.5 py-1.5 rounded-md border border-slate-200 text-[#171717] hover:bg-slate-50"
      activeLinkClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-600"
      previousClassName="inline-flex"
      previousLinkClassName="px-2.5 py-1.5 rounded-md border border-slate-200 text-[#171717] hover:bg-slate-50"
      nextClassName="inline-flex"
      nextLinkClassName="px-2.5 py-1.5 rounded-md border border-slate-200 text-[#171717] hover:bg-slate-50"
      disabledClassName="opacity-40 cursor-not-allowed"
      breakClassName="inline-flex"
      breakLinkClassName="px-2.5 py-1.5 rounded-md border border-transparent text-slate-400"
    />
  );
};

