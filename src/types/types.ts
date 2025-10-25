export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: { id?: number; name?: string };
  images?: string[];
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}