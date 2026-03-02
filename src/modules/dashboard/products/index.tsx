"use client";

import React from "react";
import { DataTable, Column } from "@/src/components/DataTable";
import useFetchProducts from "./hook/useFetchProducts";

type Product = {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
};

const columns: Column<Product>[] = [
  { key: "id", header: "ID", sortable: true },
  { key: "title", header: "Product Name", sortable: true },
  { key: "category", header: "Category", sortable: true },
  {
    key: "price",
    header: "Price",
    sortable: true,
    render: (value) => <span>${Number(value).toFixed(2)}</span>,
  },
];

const ProductsPage = () => {
  const {
    data,
    limit,
    setPage,
    total,
    setSearchQuery,
    searchQuery,
  } = useFetchProducts();
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#171717]">Products</h1>
            <p className="text-sm text-slate-500">
              Browse and manage your product catalog.
            </p>
          </div>

          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Search products
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category..."
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </header>

        <DataTable
          data={data}
          columns={columns}
          itemsPerPage={limit}
          total={total}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
