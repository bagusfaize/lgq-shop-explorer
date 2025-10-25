import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, CartItem } from "../types/types";

type CartState = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  totalItems: () => number;
  subtotal: () => number;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) =>
        set((state) => {
          const exist = state.items.find((i) => i.product.id === product.id);
          if (exist) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: qty }] };
        }),

      incrementItem: (productId: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decrementItem: (productId: number) =>
        set((state) => {
          const updatedItems = state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
          );

          return { items: updatedItems.filter(i => i.quantity > 0) };
        }),

      totalItems: () =>
        get().items.reduce((s, it) => s + it.quantity, 0),

      subtotal: () =>
        get().items.reduce((s, it) => s + it.product.price * it.quantity, 0),

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
