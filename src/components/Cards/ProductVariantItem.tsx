import { Product } from "@/store/newProductStore";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Edit, Images, Info, List, TrendingDown } from "lucide-react";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ProductElement } from "./ProductItem";
import DeleteProductVariantButton from "../Forms/ProductVariants/DeleteProductVariantButton";
import { VariantInfo } from "./ProductVariant/VariantInfo";
import { VariantImages } from "./ProductVariant/VariantImages";
import { VariantAttributes } from "./ProductVariant/VariantAttributes";

interface Image {
  id: string;
  mediaUrl: string;
}

export interface ProductVariantElement {
  id: string;
  inventoryCount: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  images: Image[];
  sellingPrice: number;
  salePrice: number;
  attributes: any[];
  product: ProductElement;
  productId: string;
}

interface ProductVariantItemProps {
  variant: ProductVariantElement;
}

const ProductVariantItem: React.FC<ProductVariantItemProps> = ({ variant }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false);

  return (
    <>
      <Card className="border-none">
        <CardContent className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-5">
          <div className="col-span-3 flex flex-col justify-start gap-4 md:flex-row md:items-center md:border-r-2 md:border-gray">
            <div className="aspect-square h-24   w-24  overflow-hidden rounded-md">
              <Image
                src={variant.images[0].mediaUrl}
                alt={variant.product.name}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between py-3 md:h-full">
              <div className="flex flex-row items-center justify-between">
                <h5 className="text-xl font-bold text-black dark:text-white">
                  {variant.product.name}
                </h5>
              </div>
              <div className="flex flex-row items-center justify-between gap-2">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  {variant?.attributes?.map((item: any, key: number) => (
                    <span key={key}>
                      {`${item?.attribute?.name}: ${item?.value}`}
                      {key !== variant?.attributes?.length - 1 && ", "}
                    </span>
                  ))}
                </span>
                <span className="text-xl text-black dark:text-white">
                  &middot;
                </span>
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Qté en stock{" "}
                  <span className="font-bold">
                    {formatNumber(variant.inventoryCount)}
                  </span>{" "}
                  {/* TODO: get product count */}
                </span>
                <TrendingDown className="ml-2 h-4 w-4 text-meta-1" />
              </div>
            </div>
          </div>
          <div className="col-span-2 grid w-full grid-cols-3 items-center gap-4 text-center">
            <div className="flex h-full flex-col items-center justify-between py-3">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Prix de vente
              </span>
              <h1 className="text-center text-lg font-bold text-black dark:text-white">
                <span
                  className={cn(variant.product.isOnSale && "line-through")}
                >
                  {formatCurrency(variant.sellingPrice, "USD")}
                </span>{" "}
              </h1>
            </div>
            <div className="flex h-full flex-col items-center justify-between py-3">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Prix promotionnel
              </span>
              <span className="text-center text-base font-bold text-black dark:text-white">
                {variant.product.isOnSale && (
                  <span className="text-meta-3">
                    {formatCurrency(variant.salePrice, "USD")}
                  </span>
                )}
              </span>
            </div>

            <div className="flex h-full flex-col items-end justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline">
                    <DotsVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Gérer cette variante</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => setShowInfo(true)}>
                    <Info />
                    <span>Invormations</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowGallery(true)}>
                    <Images />
                    <span>Images</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowUpdate(true)}>
                    <Edit />
                    <span>Mettre à jour</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowAttributes(true)}>
                    <List />
                    <span>Attributs</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowDeleteAlert(true)}>
                    <Trash />
                    <span>Supprimer la variante</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      <DeleteProductVariantButton
        variant={variant}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
      <VariantInfo open={showInfo} setOpen={setShowInfo} variant={variant} />
      <VariantImages
        open={showGallery}
        setOpen={setShowGallery}
        variant={variant}
      />
      <VariantAttributes
        open={showAttributes}
        setOpen={setShowAttributes}
        variant={variant}
      />
    </>
  );
};

export default ProductVariantItem;
