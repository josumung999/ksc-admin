import { Product } from "@/store/newProductStore";
import React from "react";
import { Card, CardContent } from "../../ui/card";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Edit, TrendingDown, TrendingUp } from "lucide-react";
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
import { ProductInventoryElement } from "./ProductIventoryItem";
import { useParams } from "next/navigation";
import {
  inventoryType,
  typeType,
} from "@/components/types_interfaces/invetory.type";

interface Image {
  id: string;
  mediaUrl: string;
}

export interface ProductVariantInventoryElement {
  id: string;
  inventoryCount: number;
  shipping: { weight: number; length: number; breadth: number; width: number };
  images: Image[];
  sellingPrice: number;
  salePrice: number;
  attributes: any[];
  product: ProductInventoryElement;
  productId: string;
}

type inventoryPops = {
  inventory: inventoryType;
};

const ProductVariantInventoryItemDetails: React.FC<inventoryPops> = ({
  inventory: {
    id,
    stock,
    motif,
    type,
    createdAt,
    updatedAt,
    productVariant,
    unitePrice,
  },
}) => {
  const params = useParams();
  const productId = params?.productId;

  return (
    <Card className="border-none">
      <CardContent className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-5">
        <div className="col-span-3 flex flex-col justify-start gap-4 md:flex-row md:items-center md:border-r-2 md:border-gray">
          <div className="flex flex-col justify-between py-3 md:h-full">
            <div className="flex flex-row items-center justify-between">
              <h5 className="text-xl font-bold text-black dark:text-white">
                {productVariant.product.name}
              </h5>
            </div>

            <div className="mt-4 flex flex-col items-start justify-between gap-y-4 ">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Crée le: {createdAt.toISOString().slice(0, 10)}
              </span>

              <div className=" flex flex-col gap-4 sm:flex-row">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  stock <span className="font-bold">{formatNumber(stock)}</span>{" "}
                </span>

                <div className="flex gap-x-2">
                  <span className="text-sm font-medium text-black/70 dark:text-white/70">
                    Prix unitaire:{" "}
                    <span className="font-bold">
                      {formatCurrency(unitePrice, "USD")}
                    </span>{" "}
                  </span>
                  {type === typeType.incoming ? (
                    <TrendingUp className="ml-2 h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="ml-2 h-4 w-4 text-meta-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 grid w-full grid-cols-3 items-center gap-4 text-center">
          <div className="flex h-full flex-col items-end justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <DotsVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Gérer cette variante</DropdownMenuLabel>

                <DropdownMenuItem>
                  <Edit />
                  <span>Mettre à jour</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash />
                  <span>Supprimer {"l'inventaire"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductVariantInventoryItemDetails;
