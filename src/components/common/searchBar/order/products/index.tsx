"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import useDebounce from "@/lib/hooks/useDebounce";
import { productOrderType } from "@/types/productOrderType";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductInventoryElement } from "@/types/productType";
import ProductInventoryItem from "@/components/Cards/Inventory/ProductIventoryItem";
import ProductOrderItem from "@/components/Cards/orders/ProductOrderItem";
import { ScrollArea } from "@/components/ui/scroll-area";
interface SearchDialogProductProps {
  setProductData: React.Dispatch<
    React.SetStateAction<productOrderType[] | undefined>
  >;
}

const SearchDialogProduct: React.FC<SearchDialogProductProps> = ({
  setProductData,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500); // 500ms delay

  // Fetch data with SWR and debounced search value
  const productData = useSWR(
    debouncedSearchValue || searchValue === ""
      ? `/api/v1/products?searchName=${debouncedSearchValue}`
      : null,
    fetcher,
  );

  const products = productData.data?.data?.records;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex min-h-fit w-full flex-col pt-5">
      <div className="flex w-full items-center justify-center">
        <div className="mb-5 flex w-full max-w-sm items-center justify-center ">
          <Input
            type="search"
            placeholder="Chercher un produit"
            value={searchValue}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
      </div>

      {searchValue !== "" && (
        <div className="mb-6 mt-2 flex w-full justify-start">
          <p className="font-satoshi text-sm text-black">
            Résultats pour -- {searchValue} --
          </p>
        </div>
      )}

      <div className="flex min-h-fit flex-col gap-10">
        {productData.isLoading ? (
          <DataLoader />
        ) : products?.length > 0 ? (
          <ScrollArea>
            {products?.map((item: ProductInventoryElement) => (
              <ProductOrderItem
                setData={setProductData}
                key={item.id}
                product={item}
              />
            ))}
          </ScrollArea>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun produit trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Veuillez créer un produit pour voir son iventaire
            </EmptyPlaceholder.Description>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-primary",
              )}
              href="/manage/products/create"
            >
              Ajouter un produit
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
};

export default SearchDialogProduct;
