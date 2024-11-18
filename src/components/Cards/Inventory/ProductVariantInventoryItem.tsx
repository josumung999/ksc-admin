import { Product } from "@/store/newProductStore";
import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Edit, History, ListOrdered, TrendingDown } from "lucide-react";
import { Plus, Trash } from "lucide-react";
import { ProductInventoryElement } from "@/components/types_interfaces/productType";
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
import { useParams } from "next/navigation";
import { ProductVariantInventoryElement } from "@/components/types_interfaces/productType";
import CreateInventoryButton from "@/components/Forms/inventories/CreateInventoryButton";
import { InventoryHistory } from "./InventoryHistory";

interface ProductVariantinventoryItemProps {
  variant: ProductVariantInventoryElement;
}

const ProductVariantinventoryItem: React.FC<
  ProductVariantinventoryItemProps
> = ({ variant }) => {
  const params = useParams();
  const productId = params?.productId;
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <>
      <Card className="border-none duration-100">
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
                </span>
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
                  <DropdownMenuItem onSelect={() => setOpenHistory(true)}>
                    <History />
                    <span>Historique</span>
                  </DropdownMenuItem>

                  <Button
                    variant={"ghost"}
                    className="w-full justify-start p-0"
                  >
                    <DropdownMenuLabel>
                      <CreateInventoryButton
                        variant_id={variant.id}
                        variant={null}
                        classProps="p-0"
                      />
                    </DropdownMenuLabel>
                  </Button>

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
      <InventoryHistory
        open={openHistory}
        setOpen={setOpenHistory}
        variant={variant}
      />
    </>
  );
};

export default ProductVariantinventoryItem;
