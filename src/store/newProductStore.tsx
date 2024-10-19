import { ImageData } from "@/components/ImageDropZone";
import { Store } from "pullstate";

export interface Product {
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  quantity: number;
  sku?: string;
  variants: Array<{
    inventoryCount: number;
    sku?: string;
    attributes: Array<{ name: string; value: string }>;
  }>;
  shipping: { weight: number; length: number; breadth: number; width: number };
  images: ImageData[];
}

export const ProductStore = new Store<Product>({
  name: "",
  description: "",
  category: "",
  subCategory: "",
  quantity: 0,
  sku: "",
  variants: [],
  shipping: { weight: 0, length: 0, breadth: 0, width: 0 },
  images: [],
});

export const handleChange = <K extends keyof Product>(
  key: K,
  value: Product[K],
) => {
  ProductStore.update((s) => {
    s[key] = value;
  });
};
