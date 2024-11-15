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
import { CreateInventoryButton } from "@/components/Forms/inventories/CreateInventoryButton";
import Image from "next/image";
import {
  inventoryType,
  attributeType,
} from "@/components/types_interfaces/invetory.type";
import { formatNumber } from "@/lib/utils";

const ProductInventoryVariantsDetails: React.FC = () => {
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/inventories/${params.productVariantId}`,
    fetcher,
  );

  const inventories: inventoryType[] = data?.data?.record;

  return (
    <DefaultLayout>
      {inventories && (
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
        </div>
      )}

      <div className="space-y-6 py-4">
        <div className="flex min-h-screen flex-col gap-10">
          <Card className="border-none">
            <CardContent className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-5">
              <div className="col-span-3 flex flex-col justify-start gap-4 md:flex-row md:items-center md:border-r-2 md:border-gray">
                <div className="flex flex-col justify-between py-3 md:h-full">
                  <div className="flex flex-row items-center justify-between">
                    <h5 className="text-xl font-bold text-black dark:text-white">
                      Mini vetilateur pro
                    </h5>
                  </div>
                  <div className="mt-4 flex flex-col items-start justify-between gap-y-4 ">
                    <span className="text-sm font-medium text-black/70 dark:text-white/70">
                      Crée le: 2323-10-10
                    </span>

                    <div className=" flex flex-col gap-4 sm:flex-row">
                      <span className="text-sm font-medium text-black/70 dark:text-white/70">
                        Stock: <span className="font-bold">122</span>{" "}
                      </span>

                      <div className="flex gap-x-2">
                        <span className="text-sm font-medium text-black/70 dark:text-white/70">
                          Prix unitaire:{" "}
                          <span className="font-bold">
                            {formatCurrency(12, "USD")}
                          </span>{" "}
                        </span>
                        <TrendingUp className="ml-2 h-4 w-4 text-green-600" />
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
                      <DropdownMenuLabel>
                        Gérer cette variante
                      </DropdownMenuLabel>

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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductInventoryVariantsDetails;

// {isLoading ? (
//   <DataLoader />
// ) : inventories?.length > 0 ? (
//   <>
//     {inventories?.map((item: inventoryType) => (
//       <ProductVariantInventoryDetailsItem
//         key={item.id}
//         inventory={item}
//       />
//     ))}
//   </>
// ) : (
//   <EmptyPlaceholder>
//     <EmptyPlaceholder.Icon />
//     <EmptyPlaceholder.Title>
//       {"Pas d'inventaire pour cette variante"}
//     </EmptyPlaceholder.Title>
//     <EmptyPlaceholder.Description>
//       {"Voyez et gerer les invetaire d'une variante ici"}
//     </EmptyPlaceholder.Description>
//     <CreateVariantButton />
//   </EmptyPlaceholder>
// )}
