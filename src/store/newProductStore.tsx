import { ImageData } from "@/components/ImageDropZone";
import { Store } from "pullstate";

export interface Product {
  name: string;
  shortDescription: string;
  category: string;
  subCategory?: string;
  quantity: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  images: ImageData[];
  sellingPrice: number;
  buyingPrice: number;
  salePrice: number;
}

export const ProductStore = new Store<Product>({
  name: "",
  shortDescription: "",
  category: "",
  subCategory: "",
  quantity: 0,
  shipping: { weight: 0, length: 0, breadth: 0, width: 0 },
  images: [],
  sellingPrice: 0,
  buyingPrice: 0,
  salePrice: 0,
});

export const handleChange = <K extends keyof Product>(
  key: K,
  value: Product[K],
) => {
  ProductStore.update((s) => {
    s[key] = value;
  });
};
