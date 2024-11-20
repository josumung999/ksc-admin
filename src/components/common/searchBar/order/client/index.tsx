"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import OrderClientCard from "@/components/Cards/orders/clientSearchCard";
import { CreateClientButton } from "@/components/Forms/Clients/CreateClientButton";
import { clientType } from "@/components/types_interfaces/clientType";
import useDebounce from "@/lib/hooks/useDebounce";

interface SearchDialogClientProps {
  setClientData: React.Dispatch<clientType>;
  setOpen: React.Dispatch<boolean>;
}

const SearchDialogClient: React.FC<SearchDialogClientProps> = ({
  setClientData,
  setOpen,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500); // 500ms delay

  // Fetch data with SWR and debounced search value
  const { data, isLoading, error } = useSWR(
    debouncedSearchValue || searchValue === ""
      ? `/api/v1/clients?searchName=${debouncedSearchValue}`
      : null,
    fetcher,
  );

  const clients: clientType[] = data?.data?.records;

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
        ) : clients?.length > 0 ? (
          clients.map((item, i) => (
            <OrderClientCard
              setOpen={setOpen}
              key={i}
              client={item}
              setData={setClientData}
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

export default SearchDialogClient;
