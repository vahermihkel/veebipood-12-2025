import type { Category } from "./Category";

export type Product = {
  id?: number;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  category: Category;
};