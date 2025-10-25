import { api } from "./clients";
import type { Category, Product } from "../types/types";

interface PaginationParams {
  limit?: number;
  offset?: number;
  title?: string;
  categoryId?: number;
}

export const getProducts = async ({
  offset = 0,
  limit = 10,
  title,
  categoryId,
}: PaginationParams): Promise<Product[]> => {
  const params: Record<string, string | number> = { offset, limit };

  if (title) params.title = title;
  
  if (categoryId) params.categoryId = categoryId;

  const { data } = await api.get<Product[]>("/products", { params });
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
