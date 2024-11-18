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

interface Props {
  setOpen: any;
  open: boolean;
  variant: any;
}

export function VariantImages({ setOpen, open, variant }: Props) {
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {variant?.product?.name ?? "Détails de la variante"}
          </SheetTitle>
          <SheetDescription>Images de la variante</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[90vh] w-full gap-4 py-4">
          <div className="grid grid-cols-2 justify-between gap-4 py-6">
            {variant?.images.map((image: any, index: number) => (
              <ProductMediaItem key={index} media={image} isVariant />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
