"use client";

import { useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";
import useDebounce from "@/lib/hooks/useDebounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import { clientType } from "@/types/clientType";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
interface SearchClientsProps {
  setClientInformations: React.Dispatch<React.SetStateAction<clientType>>;
}

const SearchClients: React.FC<SearchClientsProps> = ({
  setClientInformations,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500); // 500ms delay

  // Fetch data with SWR and debounced search value
  const clientData = useSWR(
    debouncedSearchValue && searchValue !== ""
      ? `/api/v1/clients?searchName=${debouncedSearchValue}`
      : null,
    fetcher,
  );

  const clients = clientData.data?.data?.records;

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
            placeholder="Chercher un client"
            value={searchValue}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex min-h-fit flex-col gap-10">
        {clientData.isLoading ? (
          <div className="flex h-fit w-full justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-slate-800 dark:border-slate-50"></div>
          </div>
        ) : clients?.length > 0 ? (
          <ScrollArea className="flex flex-col gap-2 space-y-2">
            {clients?.map((item: clientType) => (
              <Button
                variant={"ghost"}
                asChild
                className="mb-2 flex min-h-fit w-full items-start justify-start space-y-2 text-left"
                onClick={() => {
                  toast.success("Client ajouter");
                  setClientInformations(item);
                }}
                key={item.id}
              >
                <Card className="">
                  <CardContent className="flex flex-col items-start pb-0 pl-0">
                    <p className="text-lg font-bold">{item?.fullName}</p>
                    <p className="text-sm font-[400] text-slate-500">
                      {item?.phoneNumber}
                    </p>
                  </CardContent>
                </Card>
              </Button>
            ))}
          </ScrollArea>
        ) : clients === undefined ? (
          <p>Chercher un client</p>
        ) : (
          <p className="text-slate-500">
            Aucun Resultat pour &lsquo;
            <span className="font-medium">{searchValue}</span>&lsquo;
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchClients;
