import { FileData } from "@/lib/utils";
import { Store } from "pullstate";

export interface AttributeValue {
  attributeId: string;
  value: string;
  name: string;
  type: string;
}

export interface ProductVariant {
  inventoryCount: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  images: FileData[];
  sellingPrice: number;
  salePrice: number;
  attributes: AttributeValue[];
}

export const ProductVariantStore = new Store<ProductVariant>({
  inventoryCount: 0,
  shipping: { weight: 0, length: 0, breadth: 0, width: 0 },
  images: [],
  sellingPrice: 0,
  salePrice: 0,
  attributes: [],
});

export const handleChange = <K extends keyof ProductVariant>(
  key: K,
  value: ProductVariant[K],
) => {
  ProductVariantStore.update((s) => {
    s[key] = value;
  });
};
