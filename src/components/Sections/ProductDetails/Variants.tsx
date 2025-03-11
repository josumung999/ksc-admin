"use client";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useParams } from "next/navigation";
import { CreateVariantButton } from "@/components/Forms/ProductVariants/CreateVariantButton";
import ProductVariantItem, {
  ProductVariantElement,
} from "@/components/Cards/ProductVariantItem";
import { useState } from "react";
import { Pagination } from "@/components/Tables/Pagination";
interface Props {
  product?: any;
}

const ProductVariants: React.FC<Props> = ({ product }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);

  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/productVariants?productId=${params.id}`,
    fetcher,
  );

  const variants = data?.data?.records;

  const totalPages = data?.data?.meta?.totalPages || 1;
  const totalRecords = data?.data?.meta?.total || 0;

  console.log("Variants =>", variants);

  return (
    <div className="space-y-6 py-4">
      <div className="flex w-full flex-row items-center justify-end">
        <CreateVariantButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : variants?.length > 0 ? (
          <>
            {variants?.map((item: ProductVariantElement) => (
              <ProductVariantItem key={item.id} variant={item} />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limitPerPage={limitPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune variante trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Gérez les variantes de votre produit ici
            </EmptyPlaceholder.Description>
            <CreateVariantButton />
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
};

export default ProductVariants;
