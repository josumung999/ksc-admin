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
import { useParams } from "next/navigation";
import useSWR from "swr";
import { inventoryType } from "@/components/types_interfaces/invetory.type";
import { DataLoader } from "@/components/common/Loader";
import ProductVariantInventoryDetailsItem from "@/components/Cards/Inventory/ProductVariantInventoryItemDetails";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateVariantButton } from "@/components/Forms/ProductVariants/CreateVariantButton";
import { formatNumber } from "@/lib/utils";
import { attributeType } from "@/components/types_interfaces/invetory.type";
import CreateInventoryButton from "@/components/Forms/inventories/CreateInventoryButton";
import { DatePicker } from "@/components/ui/date-picker";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
interface Props {
  setOpen: any;
  open: boolean;
  variant: any;
}

export function InventoryHistory({ setOpen, open, variant }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/inventories/${params.productVariantId}?dateIn=${new Intl.DateTimeFormat(
      "fr-BE",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    )
      .format(date)
      .replaceAll("/", "-")}`,
    fetcher,
  );

  const incrementDate = (num: number) => {
    const newDate = new Date(date as Date);
    if (date) newDate.setDate(date.getDate() + num); // Add 1 day
    setDate(newDate); // Update the state
  };
  const inventories: inventoryType[] = data?.data?.record;

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
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-6 py-4">
            <div className=" flex  h-full w-full justify-center gap-10">
              {isLoading ? (
                <DataLoader />
              ) : inventories?.length > 0 ? (
                <div className=" min-h-fit flex-col gap-10">
                  {inventories?.map((item: inventoryType) => (
                    <ProductVariantInventoryDetailsItem
                      key={item.id}
                      inventory={item}
                    />
                  ))}
                </div>
              ) : (
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon />
                  <EmptyPlaceholder.Title>
                    {"Pas de resultat"}
                  </EmptyPlaceholder.Title>

                  <CreateVariantButton />
                </EmptyPlaceholder>
              )}
            </div>
          </div>
        </div>
        <SheetFooter>
          {/* <div className="p-x-2 flex w-full justify-between"> */}
          {/* <Button onClick={() => incrementDate(-1)}>Voir moins</Button> */}
          <Button onClick={() => incrementDate(1)}>Voir plus</Button>
          {/* </div> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
