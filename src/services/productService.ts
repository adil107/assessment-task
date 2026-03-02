/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from ".";
import { I_Product } from "../modules/dashboard/helper";

export interface I_ProductResponse {
  products: I_Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProductList(
  page: number,
  limit: number,
  search: string,
  signal?: AbortSignal,
): Promise<{ data?: I_ProductResponse; status: boolean }> {
  const skip = (page - 1) * limit;

  try {
    const { data } = await API.get("/products/search", {
      params: {
        limit,
        skip,
        ...(search && { q: search }),
      },
      signal,
    });

    // console.log(data);
    return { data:data, status: true };
  } catch (error: any) {
    // Ignore cancellations triggered by AbortController
    if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
      return { status: false };
    }

    console.error(error);
    return { status: false };
  }
}
