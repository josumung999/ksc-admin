import { Product } from "@/store/newProductStore";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Edit, Images, Info, ListOrdered, TrendingDown } from "lucide-react";
import {
  CreditCard,
  Files,
  PiggyBank,
  Plus,
  Trash,
  User,
  UserPen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Image {
  id: string;
  mediaUrl: string;
}

export interface ProductElement {
  id: string;
  images: Image[];
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
  coverImage?: Image;
  variantSummary: {
    minSellingPrice: number;
    maxSellingPrice: number;
    minSalePrice: number;
    maxSalePrice: number;
    totalInventoryCount: number;
  };
}

interface ProductItemProps {
  product: ProductElement;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card className="border-none">
      <CardContent className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-12">
        <div className="col-span-7 flex flex-col justify-start gap-4 md:flex-row md:items-center md:border-r-2 md:border-gray">
          <div className="aspect-square h-24   w-24  overflow-hidden rounded-md">
            <Image
              src={
                product?.coverImage?.mediaUrl ?? product?.images[0]?.mediaUrl
              }
              alt={product.name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between py-3 md:h-full">
            <div className="flex flex-row items-center justify-between">
              <h5 className="text-xl font-bold text-black dark:text-white">
                {product.name}
              </h5>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              {product?.variants?.length > 0 ? (
                <>
                  <Badge variant="secondary">
                    {product?.variants?.length} variante (s)
                  </Badge>
                </>
              ) : null}
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                {product?.category?.name}
                {product?.subCategory
                  ? ` > ${product?.subCategory?.name}`
                  : null}
              </span>
              <span className="text-xl text-black dark:text-white">
                &middot;
              </span>
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Qté en stock{" "}
                <span className="font-bold">
                  {formatNumber(product?.variantSummary?.totalInventoryCount)}
                </span>{" "}
                {/* TODO: get product count */}
              </span>
              <TrendingDown className="ml-2 h-4 w-4 text-meta-1" />
            </div>
          </div>
        </div>
        <div className="col-span-5 grid w-full grid-cols-4 items-center gap-4 text-center">
          <div className="flex h-full flex-col items-center justify-between py-3">
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              Prix d&apos;achat
            </span>
            <span className="text-center text-base font-bold text-black dark:text-white">
              {formatCurrency(product.buyingPrice, "USD")}
            </span>
          </div>
          <div
            className={cn(
              product?.isOnSale ? "" : "col-span-2",
              "flex h-full flex-col items-center justify-between py-3",
            )}
          >
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              Prix de vente
            </span>
            <span className="text-center text-base font-bold text-black dark:text-white">
              {`${formatCurrency(product?.variantSummary?.minSellingPrice, "USD")} - ${formatCurrency(product?.variantSummary?.maxSellingPrice, "USD")}`}
            </span>
          </div>

          {product?.isOnSale && (
            <div className="flex h-full flex-col items-center justify-between py-3">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Prix promotionnel
              </span>
              <span className="text-center text-base font-bold text-meta-3 dark:text-white">
                {`${formatCurrency(product?.variantSummary?.minSalePrice, "USD")} - ${formatCurrency(product?.variantSummary?.maxSalePrice, "USD")}`}
              </span>
            </div>
          )}

          <div className="flex h-full flex-col items-end justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <DotsVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Gérer le produit</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={`/manage/products/${product?.id}?tab=info`}>
                      <Info />
                      <span>Informations</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/manage/products/${product?.id}?tab=variants`}>
                      <ListOrdered />
                      <span>Variantes</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/manage/products/${product?.id}?tab=medias`}>
                      <Images />
                      <span>Images</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash />
                  <span>Supprimer produit</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/manage/products/${product?.id}?tab=update`}>
                    <Edit />
                    <span>Mettre à jour</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Plus />
                  <span>Plus</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
