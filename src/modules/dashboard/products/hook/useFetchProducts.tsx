"use client";

import React, { useEffect, useState } from "react";
import { I_Product } from "../../helper";
import { getProductList } from "@/src/services/productService";
import { useDebounce } from "@/src/hooks/useDebounce";

const useFetchProducts = () => {
  const [data, setData] = useState<I_Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const controller = new AbortController();

    const handleGetProducts = async () => {
      const { data, status } = await getProductList(
        page + 1,
        limit,
        debouncedSearch,
        controller.signal,
      );

      if (status) {
        setData(data?.products ?? []);
        setTotal(data?.total ?? 0);
      }
      setLoading(false);
    };

    handleGetProducts();

    return () => {
      controller.abort();
    };
  }, [debouncedSearch, page, limit]);

  return {
    page,
    limit,
    total,
    data,
    loading,
    searchQuery,

    setPage,
    setLimit,
    setSearchQuery,
  };
};

export default useFetchProducts;
