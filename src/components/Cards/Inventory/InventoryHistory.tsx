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
import { fetcher, formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { inventoryType } from "@/types/invetory.type";
import { DataLoader } from "@/components/common/Loader";
import ProductVariantInventoryDetailsItem from "@/components/Cards/Inventory/ProductVariantInventoryItemDetails";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateVariantButton } from "@/components/Forms/ProductVariants/CreateVariantButton";
import { formatNumber } from "@/lib/utils";
import { attributeType } from "@/types/invetory.type";
import CreateInventoryButton from "@/components/Forms/inventories/CreateInventoryButton";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ScrollArea } from "@/components/ui/scroll-area";
import DataPagination from "@/components/common/pagination";
import { DateRange } from "react-day-picker";
interface Props {
  setOpen: any;
  open: boolean;
  variant: any;
}

export function InventoryHistory({ setOpen, open, variant }: Props) {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/inventories/${variant.id}?${date?.from && date?.to ? `startDate=${date.from.toISOString().slice(0, 10)}&endDate=${date.to.toISOString().slice(0, 10)}` : ""}&page=1`,
    fetcher,
  );

  console.log(data);

  const inventories: inventoryType[] = data?.data?.records;
  const totalPages = data?.data?.meta?.totalPages;

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Historique Approvisionnement</SheetTitle>
          <SheetDescription>
            Toutes les variations du stock pour cette variante
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <DatePickerWithRange setDateParant={setDate} />
        </div>

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
          <DataPagination totalPages={totalPages} />
          {/* </div> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
