import { Product } from "@/store/newProductStore";
import React from "react";
import { Card, CardContent } from "../../ui/card";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Edit, Images, Info, ListOrdered, TrendingDown } from "lucide-react";
import { Plus, Trash } from "lucide-react";

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

export interface ProductInventoryElement {
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
}

interface ProductInventoryItemProps {
  product: ProductInventoryElement;
}

const ProductInventoryItem: React.FC<ProductInventoryItemProps> = ({
  product,
}) => {
  return (
    <Link href={`/stock/inventory/${product.id}`}>
      <Card className="border-none duration-100 hover:scale-95">
        <CardContent className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-5">
          <div className="col-span-3 flex flex-col justify-start gap-4 md:flex-row md:items-center md:border-r-2 md:border-gray">
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
                      {product?.variants?.length} variant(s)
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
                  <span className="font-bold">{formatNumber(1200)}</span>{" "}
                  {/* TODO: get product count */}
                </span>
                {/* <TrendingDown className="ml-2 h-4 w-4 text-meta-1" /> */}
              </div>
            </div>
          </div>

          <div className="col-span-2 grid w-full grid-cols-3 items-center justify-end gap-4 text-center">
            <div className="flex h-full flex-col items-center justify-between py-3">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Prix d&apos;achat
              </span>
              <span className="text-center text-lg font-bold text-black dark:text-white">
                {formatCurrency(product.buyingPrice, "USD")}
              </span>
            </div>
            <div className="flex h-full flex-col items-center justify-between py-3">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Prix de vente
              </span>
              <span className="text-center text-base font-bold text-black dark:text-white">
                <span className={cn(product.isOnSale && "line-through")}>
                  {formatCurrency(product.sellingPrice, "USD")}
                </span>{" "}
                {product.isOnSale && (
                  <span className="text-meta-3">
                    {formatCurrency(product.salePrice, "USD")}
                  </span>
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductInventoryItem;
