export type inventoryType = {
  id: string;
  stock: number;
  motif: string;
  type: typeType;
  createdAt: Date;
  updatedAt: Date;
  productVariant: productVariantType;
};

export enum typeType {
  incoming = "INCOMING",
  outcoming = "OUTGOING",
}

export type attributeType = {
  name: string;
  value: string;
};

type imageType = {
  id: string;
  mediaUrl: string;
};

type descriptionType = {
  details: string;
};

type categoryType = {
  categoryId: string;
  categoryName: string;
};

type subCategorytype = {
  subCategoryId: string;
  subCategoryName: string;
};

type coverImageType = {
  coverImageUrl?: string;
  mediaUrl?: string;
};

type productType = {
  product_id: string;
  name: string;
  shortDescription: string;
  description: descriptionType;
  sellingPrice: number;
  buyingPrice: number;
  salePrice: number;
  isOnSale: boolean;
  sku: string;
  barcodeUrl: string;
  category: categoryType;
  subCategory: subCategorytype;
  coverImage: coverImageType;
};

type productVariantType = {
  variant_id: string;
  sku: string;
  sellingPrice: number;
  salePrice: number;
  inventoryCount: number;
  attributes: attributeType[];
  images: imageType[];
  product: productType;
};
