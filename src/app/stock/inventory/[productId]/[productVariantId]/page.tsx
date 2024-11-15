"use client";

import { fetcher } from "@/lib/utils";
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
              {formatNumber(inventories[0].productVariant.inventoryCount ?? 0)}
            </span>{" "}
            {/* TODO: get product count */}
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

          {/* <TrendingDown className="ml-2 h-4 w-4 text-meta-1" /> */}
        </div>
      </div>

      <div className="space-y-6 py-4">
        <div className="flex min-h-screen flex-col gap-10">
          {isLoading ? (
            <DataLoader />
          ) : inventories?.length > 0 ? (
            <>
              {inventories?.map((item: inventoryType) => (
                <ProductVariantInventoryDetailsItem
                  key={item.id}
                  inventory={item}
                />
              ))}
            </>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon />
              <EmptyPlaceholder.Title>
                {"Pas s'inventaire pour cette variante"}
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                {"Voyez et gerer les invetaire d'une variante ici"}
              </EmptyPlaceholder.Description>
              <CreateVariantButton />
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductInventoryVariantsDetails;

{
  /* <div className="flex w-full flex-row justify-between">
<div className="flex w-full flex-col justify-start">
  <p className="text-sm font-medium text-black/70 dark:text-white/70">
    Qt. Totale: <span className="font-[600]"> 120</span>
  </p>
  <div className="flex w-full flex-row gap-2">
    <p className="text-sm font-medium text-black/70 dark:text-white/70">
      Taille: <span className="font-[600]"> 20</span>
    </p>
    <p className="text-sm font-medium text-black/70 dark:text-white/70">
      Couleur: <span className="font-[600]"> Bleu</span>
    </p>
  </div>
</div>

<div className="flex w-full flex-row items-center justify-end">
  <CreateInventoryButton />
</div>
</div> */
}
