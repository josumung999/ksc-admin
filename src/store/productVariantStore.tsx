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
  buyingPrice: number;
  isOnSale: boolean;
  attributes: AttributeValue[];
}

const initialState: ProductVariant = {
  inventoryCount: 0,
  shipping: { weight: 0, length: 0, breadth: 0, width: 0 },
  images: [],
  sellingPrice: 0,
  salePrice: 0,
  buyingPrice: 0,
  isOnSale: false,
  attributes: [],
};

export const ProductVariantStore = new Store<ProductVariant>({
  ...initialState,
});

export const handleChange = <K extends keyof ProductVariant>(
  key: K,
  value: ProductVariant[K],
) => {
  ProductVariantStore.update((s) => {
    s[key] = value;
  });
};

export const resetProductVariantState = () => {
  ProductVariantStore.update((s) => {
    Object.assign(s, initialState);
  });
};
