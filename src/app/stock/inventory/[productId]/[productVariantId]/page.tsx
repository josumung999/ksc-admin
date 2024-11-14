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
const ProductInventoryVariantsDetails: React.FC = () => {
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/inventories/${params.productVariantId}`,
    fetcher,
  );

  const inventaires = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={`Inventaire > ${inventaires ? inventaires[0].product?.name : ""}`}
      />

      <div className="flex w-full flex-row justify-between">
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
      </div>

      <div className="space-y-6 py-4">
        <div className="flex min-h-screen flex-col gap-10">
          {isLoading ? (
            <DataLoader />
          ) : inventaires?.length > 0 ? (
            <>
              {inventaires?.map((item: ProductVariantInventoryElement) => (
                <ProductVariantInventoryDetailsItem
                  key={item.id}
                  variant={item}
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

// <div className="flex flex-row items-center justify-between gap-2">
// <span className="text-sm font-medium text-black/70 dark:text-white/70">
//   {variant?.attributes?.map((item: any, key: number) => (
//     <span key={key}>
//       {`${item?.attribute?.name}: ${item?.value}`}
//       {key !== variant?.attributes?.length - 1 && ", "}
//     </span>
//   ))}
// </span>
// <span className="text-xl text-black dark:text-white">
//   &middot;
// </span>
// <span className="text-sm font-medium text-black/70 dark:text-white/70">
//   Qté en stock{" "}
//   <span className="font-bold">
//     {formatNumber(variant.inventoryCount)}
//   </span>{" "}
//   {/* TODO: get product count */}
// </span>
// {/* <TrendingDown className="ml-2 h-4 w-4 text-meta-1" /> */}
// </div>
