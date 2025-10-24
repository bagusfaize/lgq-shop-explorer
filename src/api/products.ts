import { api } from "./clients";
import type { Category, Product } from "../types/types";

interface PaginationParams {
  limit?: number;
  offset?: number;
}

export const getProducts = async ({
  offset = 0,
  limit = 10,
}: PaginationParams): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products", {
    params: { offset, limit },
  });
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>("/categories");
  return data;
};
