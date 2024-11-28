import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProductVariant } from "@/types/getOrderType";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { OrderItem } from "@/types/getOrderType";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
const OrderDetails = ({ data }: { data: OrderItem }) => {
  return (
    <div className="w-full ">
      <div className="flex w-full flex-col justify-between gap-4 p-0 pr-4 sm:flex-row sm:items-center">
        <div className="dark:border-gray-800 flex h-full flex-col items-start gap-4 border-gray sm:w-[60%] sm:flex-row  sm:items-center sm:border-r-2">
          <div className="aspect-square h-28   w-28  overflow-hidden rounded-md">
            <Image
              src={data?.productVariant?.product?.images[0].mediaUrl}
              alt={data?.productVariant?.product?.name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className=" flex h-full  flex-col justify-between gap-2 ">
            <h5 className="text-md font-bold text-black dark:text-white">
              {data?.productVariant?.product?.name}
            </h5>
            <div className="flex flex-col items-start justify-between gap-2">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                {data?.productVariant?.attributes?.map(
                  (item: any, key: number) => (
                    <span key={key}>
                      {`${item?.attribute?.name}: ${item?.value}`}
                      {key !== data?.productVariant?.attributes?.length - 1 &&
                        ", "}
                    </span>
                  ),
                )}
              </span>
              <span className="text-xl text-black dark:text-white"></span>
            </div>
            <div className="flex flex-auto  gap-2">
              <p className="text-sm font-medium text-black/70 dark:text-white/70">
                Prix unitaire:{" "}
                {formatCurrency(data?.productVariant?.sellingPrice, "USD")}
              </p>
              {data?.productVariant?.isOnSale && (
                <p className="text-sm font-medium text-black/70 dark:text-white/70">
                  Rabais:{" "}
                  {formatCurrency(
                    data?.productVariant?.sellingPrice -
                      data?.productVariant?.salePrice,
                    "USD",
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col  justify-between gap-8 sm:w-[40%] sm:flex-row sm:items-center">
          <div className="flex h-full flex-row items-start gap-20 sm:justify-between sm:gap-8">
            <div className="flex flex-col items-start justify-between gap-2">
              <p className="text-sm text-slate-500 dark:text-slate-300">Qté</p>
              <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                {data.quantity ?? 1}
              </p>
            </div>

            <div className="flex flex-col items-start justify-between gap-2">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Prix total
              </p>
              <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                {formatCurrency(
                  data?.productVariant?.isOnSale
                    ? data?.productVariant?.salePrice
                    : data?.productVariant?.sellingPrice * (data.quantity ?? 1),
                  "USD",
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-end justify-end gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"sm"} variant={"outline"}>
                  <Edit size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Card className="flex flex-col gap-4 pt-3 ">
                  <CardTitle className="pl-4 font-medium text-slate-400">
                    Modifier la Quantité
                  </CardTitle>
                  <CardContent>
                    <Input type="number" defaultValue={data.quantity} />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>

            <Button size={"sm"} variant={"outline"}>
              <Trash2 className="text-red" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
