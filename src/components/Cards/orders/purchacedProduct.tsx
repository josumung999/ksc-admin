import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ProductVariantInventoryElement } from "@/types/productType";
import { formatCurrency } from "@/lib/utils";
import SearchClients from "@/components/common/searchBar/order/client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";

interface PurchacedProductProps {
  setPurchasedProducts: React.Dispatch<
    React.SetStateAction<ProductVariantInventoryElement[]>
  >;
  variant: ProductVariantInventoryElement;
}
const PurchacedProduct: React.FC<PurchacedProductProps> = ({
  setPurchasedProducts,
  variant,
}) => {
  return (
    <Card className="w-full p-4">
      <CardContent className="flex w-full flex-col justify-between gap-4 p-0 pr-4 sm:flex-row sm:items-center">
        <div className="dark:border-gray-800 flex h-full flex-col items-start gap-4 border-gray sm:w-[60%] sm:flex-row  sm:items-center sm:border-r-2">
          <div className="aspect-square h-28   w-28  overflow-hidden rounded-md">
            <Image
              src={variant.images[0].mediaUrl}
              alt={variant.product.name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className=" flex h-full  flex-col justify-between gap-2 ">
            <h5 className="text-md font-bold text-black dark:text-white">
              {variant?.product?.name}
            </h5>
            <div className="flex flex-col items-start justify-between gap-2">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                {variant?.attributes?.map((item: any, key: number) => (
                  <span key={key}>
                    {`${item?.attribute?.name}: ${item?.value}`}
                    {key !== variant?.attributes?.length - 1 && ", "}
                  </span>
                ))}
              </span>
              <span className="text-xl text-black dark:text-white"></span>
            </div>
            {variant.isOnSale && (
              <p className="text-sm font-medium text-black/70 dark:text-white/70">
                Rabais:{" "}
                {formatCurrency(
                  variant?.sellingPrice - variant?.salePrice,
                  "USD",
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex h-full flex-col  justify-between gap-8 sm:w-[40%] sm:flex-row sm:items-center">
          <div className="flex h-full flex-row items-start gap-20 sm:justify-between sm:gap-8">
            <div className="flex flex-col items-start justify-between gap-2">
              <p className="text-sm text-slate-500 dark:text-slate-300">Qté</p>
              <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                {variant.quantity ?? 1}
              </p>
            </div>

            <div className="flex flex-col items-start justify-between gap-2">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Prix total
              </p>
              <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                {formatCurrency(
                  variant?.isOnSale
                    ? variant?.salePrice
                    : variant.sellingPrice * (variant.quantity ?? 1),
                  "USD",
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-end justify-end gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"sm"} variant="outline">
                  <Edit size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Card className="flex flex-col gap-4 pt-3 ">
                  <CardTitle className="pl-4 font-medium text-slate-400">
                    Modifier la Quantité
                  </CardTitle>
                  <CardContent>
                    <Input
                      onChange={(e) => {
                        setPurchasedProducts((el) => {
                          return el.map((item) => {
                            if (item.id === variant.id) {
                              return {
                                ...item,
                                quantity: isNaN(parseInt(e.target.value))
                                  ? 1
                                  : parseInt(e.target.value),
                              };
                            }
                            return item;
                          });
                        });
                      }}
                      type="number"
                      defaultValue={variant.quantity}
                    />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>

            <Button
              size={"sm"}
              className="border-red dark:border-red"
              variant="outline"
              onClick={() => {
                setPurchasedProducts((el) =>
                  el.filter((item) => item.id !== variant.id),
                );
              }}
            >
              <Trash2 className="text-red" size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchacedProduct;
