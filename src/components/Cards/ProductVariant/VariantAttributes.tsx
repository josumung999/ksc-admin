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
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "@/css/SwiperGallery.css";
import { useState } from "react";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductMediaItem from "../ProductMediaItem";
import { ImagePlus } from "lucide-react";
import { AddProductImages } from "@/components/Forms/Products/AddProductImages";
import { CreateAttributeButton } from "@/components/Forms/Attributes/CreateAttributeButton";

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
          <CreateAttributeButton variant={variant} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
