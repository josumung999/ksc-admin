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

interface Props {
  product?: any;
}

const ProductVariants: React.FC<Props> = ({ product }) => {
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/productVariants?productId=${params.id}`,
    fetcher,
  );

  console.log("Product Variants:", data);
  const variants = data?.data?.records;

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
