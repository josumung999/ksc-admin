import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { inventoryType } from "@/types/invetory.type";
import { DataLoader } from "@/components/common/Loader";
import ProductVariantInventoryDetailsItem from "@/components/Cards/Inventory/ProductVariantInventoryItemDetails";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import CreateInventoryButton from "@/components/Forms/inventories/CreateInventoryButton";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/Tables/Pagination";
interface Props {
  setOpen: any;
  open: boolean;
  variant: any;
}

export function InventoryHistory({ setOpen, open, variant }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);

  const { data, isLoading, error } = useSWR(
    `/api/v1/inventories/${variant.id}?&page=${currentPage}&limit=${limitPerPage}`,
    fetcher,
  );

  console.log(data);

  const inventories: inventoryType[] = data?.data?.records;
  const totalPages = data?.data?.meta?.totalPages;
  const totalRecords = data?.data?.meta?.total;

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Historique Approvisionnement</SheetTitle>
          <SheetDescription>
            Toutes les variations du stock pour cette variante
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-6 py-4">
            <div className=" flex  h-full w-full justify-center gap-10">
              {isLoading ? (
                <DataLoader />
              ) : inventories?.length > 0 ? (
                <ScrollArea className=" flex-col-10 flex h-[65vh] w-full">
                  <div className="flex h-full w-full flex-col gap-y-10">
                    {inventories?.map((item: inventoryType) => (
                      <ProductVariantInventoryDetailsItem
                        key={item.id}
                        inventory={item}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon />
                  <EmptyPlaceholder.Title>
                    {"Pas de resultat"}
                  </EmptyPlaceholder.Title>

                  <CreateInventoryButton
                    variant_id={variant.id}
                    variant={"outline"}
                    classProps="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  />
                </EmptyPlaceholder>
              )}
            </div>
          </div>
        </div>
        <SheetFooter className="flex w-full justify-center">
          {/* <div className="p-x-2 flex w-full justify-between"> */}
          {/* <Button onClick={() => incrementDate(-1)}>Voir moins</Button> */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            limitPerPage={limitPerPage}
            onPageChange={setCurrentPage}
          />
          {/* </div> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
