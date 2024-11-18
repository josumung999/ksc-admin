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
import { ProductVariantInventoryElement } from "@/components/types_interfaces/productType";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const ProductInventoryVariants: React.FC = () => {
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/productVariants?productId=${params.productId}`,
    fetcher,
  );

  const {
    data: productData,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = useSWR(`/api/v1/products/${params.productId}`, fetcher);

  const variants = data?.data?.records;
  const product = productData?.data.record;

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Inventaire > ${product ? product?.name : ""}`} />

      <div className="space-y-6 py-4">
        <div className="flex min-h-screen flex-col gap-10">
          {isLoading ? (
            <DataLoader />
          ) : variants?.length > 0 ? (
            <>
              {variants?.map((item: ProductVariantInventoryElement) => (
                <ProductVariantInventoryItem key={item.id} variant={item} />
              ))}
            </>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon />
              <EmptyPlaceholder.Title>
                Aucune variante trouvée
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Veiullez créer une variante du produit afin de gérer son
                inventaire
              </EmptyPlaceholder.Description>
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href={`/manage/products/${product?.id}?tab=variants`}
              >
                Gérer les variantes
              </Link>
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductInventoryVariants;
