"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Trash, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { fetcher, formatCurrency } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useParams } from "next/navigation";
import { CreateVariantButton } from "@/components/Forms/ProductVariants/CreateVariantButton";
import ProductVariantInventoryDetailsItem, {
  ProductVariantInventoryElement,
} from "@/components/Cards/Inventory/ProductVariantInventoryItemDetails";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateInventoryButton from "@/components/Forms/inventories/CreateInventoryButton";
import Image from "next/image";
import {
  inventoryType,
  attributeType,
} from "@/components/types_interfaces/invetory.type";
import { formatNumber } from "@/lib/utils";
import { UpdateInventoryButton } from "@/components/Forms/inventories/UpdateInventoryButton";

const ProductInventoryVariantsDetails: React.FC = () => {
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/inventories/${params.productVariantId}`,
    fetcher,
  );

  const inventories: inventoryType[] = data?.data?.record;

  return (
    <DefaultLayout>
      {inventories?.length > 0 && (
        <div className=" gapx-4 flex w-full flex-col gap-y-4">
          {/* image and Breadcrumb of the variant*/}
          <div className="flex w-full flex-row gap-x-4">
            <div className="aspect-square h-24 w-24  overflow-hidden rounded-md">
              <Image
                src={inventories[0]?.productVariant.images[0].mediaUrl}
                alt={inventories[0]?.productVariant.product.name}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="w-full">
              <Breadcrumb
                pageName={`Inventaire > ${inventories[0] ? inventories[0]?.productVariant?.product?.name : ""}`}
              />
            </div>
          </div>

          {/* details about the variant  */}
          <div className="flex flex-col items-center justify-between gap-2">
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              Qté en stock{" "}
              <span className="font-bold">
                {formatNumber(
                  inventories[0].productVariant.inventoryCount ?? 0,
                )}
              </span>{" "}
            </span>
            {inventories[0] && (
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                {inventories[0]?.productVariant?.attributes?.map(
                  (item: attributeType, key: number) => (
                    <span key={key}>
                      {`${item?.name}: ${item?.value}`}
                      {key !==
                        inventories[0]?.productVariant.attributes?.length - 1 &&
                        ", "}
                    </span>
                  ),
                )}
              </span>
            )}
          </div>

          <CreateInventoryButton
            variant={"outline"}
            classProps="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          />
        </div>
      )}
      {isLoading ? (
        <DataLoader />
      ) : inventories?.length > 0 ? (
        <div className=" grid-col-1 grid min-h-fit gap-10 md:grid-cols-2">
          {inventories?.map((item: inventoryType) => (
            <ProductVariantInventoryDetailsItem
              key={item.id}
              inventory={item}
            />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon />
          <EmptyPlaceholder.Title>
            {"Pas d'inventaire pour ce produit"}
          </EmptyPlaceholder.Title>

          <CreateInventoryButton
            classProps={"mt-6 bg-primary"}
            variant={undefined}
          />
        </EmptyPlaceholder>
      )}
    </DefaultLayout>
  );
};

export default ProductInventoryVariantsDetails;
