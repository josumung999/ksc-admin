import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import "swiper/css";
import "@/css/SwiperGallery.css";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateProductAttributeButton } from "@/components/Forms/ProductVariants/CreateAttributeButton";

interface Props {
  setOpen: any;
  open: boolean;
  variant: any;
}

export function VariantAttributes({ setOpen, open, variant }: Props) {
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {variant?.product?.name ?? "Détails de la variante"}
          </SheetTitle>
          <SheetDescription>Images de la variante</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[80vh] w-full gap-4 py-4">
          <div className="border-t border-gray">
            <dl>
              {variant?.attributes?.map((atribute: any, index: number) => (
                <div
                  className={cn(
                    index % 2 == 0 ? "bg-white" : "bg-gray",
                    "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
                  )}
                  key={index}
                >
                  <dt className="text-gray-500 text-sm font-medium">
                    {atribute?.attribute?.name}
                  </dt>
                  <dd className="text-gray-900 mt-1 text-sm sm:col-span-2 sm:mt-0">
                    {atribute?.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollArea>
        <SheetFooter>
          <CreateProductAttributeButton variant={variant} className="w-full" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
