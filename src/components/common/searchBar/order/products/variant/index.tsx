"use client";

import { cn, fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useParams } from "next/navigation";
import { CreateVariantButton } from "@/components/Forms/ProductVariants/CreateVariantButton";
import ProductVariantInventoryItem from "@/components/Cards/Inventory/ProductVariantInventoryItem";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  ProductInventoryElement,
  ProductVariantInventoryElement,
} from "@/types/productType";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { productOrderType } from "@/types/productOrderType";
import ProductVariantOrderItem from "@/components/Cards/orders/ProductVariantOrderItem";

interface SearchProductOrderVariantsProps {
  product: ProductInventoryElement;
  setData: React.Dispatch<React.SetStateAction<productOrderType[] | undefined>>;
}

const SearchProductOrderVariants: React.FC<SearchProductOrderVariantsProps> = ({
  setData,
  product,
}) => {
  const { data, isLoading, error } = useSWR(
    `/api/v1/productVariants?productId=${product.id}`,
    fetcher,
  );

  const variants = data?.data?.records;

  return (
    <div className="space-y-6 py-4">
      <div className="flex min-h-fit flex-col gap-10 ">
        {isLoading ? (
          <DataLoader />
        ) : variants?.length > 0 ? (
          <>
            {variants?.map((item: ProductVariantInventoryElement) => (
              <ProductVariantOrderItem
                setData={setData}
                key={item.id}
                variant={item}
                product={product}
              />
            ))}
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune variante trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Veillez créer une variante du produit enfin de gérer son
              inventaire
            </EmptyPlaceholder.Description>
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href={`/manage/products/${product.id}?tab=variants`}
            >
              Gérer les variantes
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
};

export default SearchProductOrderVariants;
