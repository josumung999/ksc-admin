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
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  setOpen: any;
  open: boolean;
  variant: any;
}

export function VariantInfo({ setOpen, open, variant }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {variant?.product?.name ?? "Détails de la variante"}
          </SheetTitle>
          <SheetDescription>Information de la variante</SheetDescription>
        </SheetHeader>
        <ScrollArea className="grid min-h-[75vh] gap-4 py-4">
          <div className="space-y-2">
            {/* Main Image Swiper */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              modules={[Thumbs, Navigation]}
              thumbs={{ swiper: thumbsSwiper }}
              className="w-full"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {variant?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image?.mediaUrl}
                    alt={`Gallery Image ${index + 1}`}
                    className="aspect-square w-full rounded-lg object-cover"
                    width={500}
                    height={500}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              modules={[Thumbs]}
              className="product-thumb mx-auto w-full max-w-[608px]"
            >
              {variant?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image?.mediaUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className={cn(
                      "border-gray-50 aspect-square w-full cursor-pointer rounded-md border-2 object-cover transition-all duration-500 hover:border-primary",
                      activeIndex === index ? "border-primary" : null,
                    )}
                    width={60}
                    height={60}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Prix de vente
                </span>
                <span className="text-center text-lg font-bold text-black dark:text-white">
                  {variant?.sellingPrice}
                </span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Prix promotionnel
                </span>
                <span className="text-center text-base font-bold text-black dark:text-white">
                  {variant?.salePrice}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Quantité
                </span>
                <span className="text-center text-lg font-bold text-black dark:text-white">
                  {variant?.inventoryCount}
                </span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Stock
                </span>
                <span className="text-center text-base font-bold text-black dark:text-white">
                  {variant?.inventoryCount}
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Voir plus</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
