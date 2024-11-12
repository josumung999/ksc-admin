import { FileData } from "@/lib/utils";
import { Store } from "pullstate";

export interface ProductImages {
  images: FileData[];
}

const initialState: ProductImages = {
  images: [],
};

export const ProductImagesStore = new Store<ProductImages>({
  ...initialState,
});

export const updateProductImages = <K extends keyof ProductImages>(
  key: K,
  value: ProductImages[K],
) => {
  ProductImagesStore.update((s) => {
    s[key] = value;
  });
};

export const resetProductImagesState = () => {
  ProductImagesStore.update((s) => {
    Object.assign(s, initialState);
  });
};
