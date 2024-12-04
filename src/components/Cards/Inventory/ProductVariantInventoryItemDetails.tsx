import React from "react";
import { Card, CardContent } from "../../ui/card";
import Image from "next/image";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { inventoryType, typeType } from "@/types/invetory.type";
import DeleteInventoryButton from "@/components/Forms/inventories/DeleteInventoryButton";
import { ProductInventoryElement } from "@/types/productType";
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
  inventory,
}) => {
  console.log(inventory.type);
  return (
    <Card className="w-full border-none">
      <CardContent className="flex gap-4 pt-6">
        <div className="col-span-3 flex w-full flex-col justify-start gap-4">
          <div className="flex w-full flex-row items-start justify-between py-3 md:h-full">
            <div className="w-full">
              <div className="flex flex-row items-start justify-start gap-x-2">
                <h5 className="text-xl font-bold text-black dark:text-white">
                  <span>
                    stock{" "}
                    <span className="font-bold">
                      {formatNumber(inventory?.stock)}
                    </span>{" "}
                  </span>
                </h5>
                {inventory?.type === ("INCOMING" as typeType) ? (
                  <TrendingUp className="ml-2 h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="ml-2 h-5 w-5 text-meta-1" />
                )}
              </div>
              <div className="mt-5 flex flex-col items-start justify-between gap-y-3 ">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Prix unitaire:{" "}
                  <span className="font-bold">
                    {formatCurrency(inventory?.unitePrice, "USD")}
                  </span>{" "}
                </span>
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Crée le: {formatDate(inventory?.createdAt)}
                </span>
              </div>
            </div>

            <div className="">
              <div className="flex h-full flex-row items-end justify-center gap-x-3">
                <DeleteInventoryButton inventory={inventory} />
              </div>
            </div>
          </div>

          <div>
            <p>{inventory.motif}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductVariantInventoryItemDetails;
