import { ImageData } from "@/components/ImageDropZone";
import { FileData } from "@/lib/utils";
import { Store } from "pullstate";

export interface AttributeValue {
  attributeId: string;
  value: string;
}

export interface Product {
  inventoryCount: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  images: FileData[];
  sellingPrice: number;
  salePrice: number;
  attributes: AttributeValue[];
}

export const ProductVariantStore = new Store<Product>({
  inventoryCount: 0,
  shipping: { weight: 0, length: 0, breadth: 0, width: 0 },
  images: [],
  sellingPrice: 0,
  salePrice: 0,
  attributes: [],
});

export const handleChange = <K extends keyof Product>(
  key: K,
  value: Product[K],
) => {
  ProductVariantStore.update((s) => {
    s[key] = value;
  });
};
