export type ProductInventoryElement = {
  id: string;
  images: ImageType[];
  name: string;
  shortDescription: string;
  category: any;
  subCategory?: any;
  quantity: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  sellingPrice: number;
  buyingPrice: number;
  salePrice: number;
  isOnSale: boolean;
  variants: any[];
  coverImage?: ImageType;
  variantSummary: variantSummaryInterface;
};

export type ImageType = {
  id: string;
  mediaUrl: string;
};

export type variantSummaryInterface = {
  minSellingPrice: number;
  maxSellingPrice: number;
  minSalePrice: number;
  maxSalePrice: number;
  totalInventoryCount: number;
};

export interface ProductVariantInventoryElement {
  id: string;
  inventoryCount: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  images: ImageType[];
  sellingPrice: number;
  salePrice: number;
  attributes: any[];
  product: ProductInventoryElement;
  productId: string;
}
