"use client";

import React from "react";
import { DataTable, Column } from "@/src/components/DataTable";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

const mockProducts: Product[] = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 89.99, stock: 24 },
  { id: 2, name: "Running Shoes", category: "Sports", price: 59.99, stock: 12 },
  { id: 3, name: "Coffee Maker", category: "Home", price: 39.99, stock: 8 },
  { id: 4, name: "Smart Watch", category: "Electronics", price: 129.99, stock: 15 },
  { id: 5, name: "Office Chair", category: "Furniture", price: 199.99, stock: 5 },
  { id: 6, name: "Desk Lamp", category: "Home", price: 24.99, stock: 30 },
  { id: 7, name: "Backpack", category: "Accessories", price: 34.99, stock: 18 },
  { id: 8, name: "Bluetooth Speaker", category: "Electronics", price: 49.99, stock: 22 },
  { id: 9, name: "Yoga Mat", category: "Sports", price: 19.99, stock: 40 },
  { id: 10, name: "Water Bottle", category: "Accessories", price: 14.99, stock: 50 },
];

const columns: Column<Product>[] = [
  { key: "id", header: "ID", sortable: true },
  { key: "name", header: "Product", sortable: true },
  { key: "category", header: "Category", sortable: true },
  {
    key: "price",
    header: "Price",
    sortable: true,
    render: (value) => <span>${Number(value).toFixed(2)}</span>,
  },
  { key: "stock", header: "In stock", sortable: true },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#171717]">Products</h1>
            <p className="text-sm text-slate-500">
              Browse and manage your product catalog.
            </p>
          </div>
        </header>

        <DataTable
          data={mockProducts}
          columns={columns}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
