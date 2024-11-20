"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import OrderClientCard from "@/components/Cards/orders/productsearchCard";
import { CreateClientButton } from "@/components/Forms/products/CreateClientButton";
import { clientType } from "@/types/clientType";
import useDebounce from "@/lib/hooks/useDebounce";
import { productOrderType } from "@/types/productOrderType";
import { ProductInventoryElement } from "@/types/productType";

interface SearchDialogProductProps {
  setProductData: React.Dispatch<productOrderType>;
  setOpen: React.Dispatch<boolean>;
}

const SearchDialogProduct: React.FC<SearchDialogProductProps> = ({
  setProductData,
  setOpen,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500); // 500ms delay

  // Fetch data with SWR and debounced search value
  const { data, isLoading, error } = useSWR(
    debouncedSearchValue || searchValue === ""
      ? `/api/v1/products?searchName=${debouncedSearchValue}`
      : null,
    fetcher,
  );

  const products = data?.data?.records;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex w-full flex-col pt-5">
      <div className="flex w-full items-center justify-center">
        <div className="mb-5 flex w-full max-w-sm items-center justify-center ">
          <Input
            type="search"
            placeholder="Chercher un client"
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

      <div className="flex min-h-fit flex-col gap-5">
        {isLoading ? (
          <DataLoader />
        ) : products?.length > 0 ? (
          products.map((item: ProductInventoryElement, i: number) => (
            <OrderClientCard
              setOpen={setOpen}
              key={i}
              client={item}
              setData={setProductData}
            />
          ))
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>Aucun client trouvé</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucun client trouvé
            </EmptyPlaceholder.Description>
            <CreateClientButton />
          </EmptyPlaceholder>
        )}
      </div>

      <div className="mt-6 flex w-full flex-col gap-2">
        <p className="text-sm">Creer un client {"s'il n'existe pas"}</p>
        <CreateClientButton />
      </div>
    </div>
  );
};

export default SearchDialogProduct;
