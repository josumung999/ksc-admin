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
        <ScrollArea className="h-[90vh] w-full gap-4 py-4">
          <div className="space-y-2">
            {/* Main Image Swiper */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              modules={[Thumbs, Navigation]}
              thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
              className="w-full"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {variant?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image?.mediaUrl}
                    alt={`Gallery Image ${index + 1}`}
                    className="animate-jump-in animate-once aspect-1 w-full rounded-lg object-cover"
                    width={500}
                    height={500}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            <Swiper
              onSwiper={(swiper) => {
                if (!thumbsSwiper) {
                  setThumbsSwiper(swiper);
                }
              }}
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
                      "border-gray-50 aspect-1 w-full cursor-pointer rounded-md border-2 object-cover transition-all duration-500 hover:border-primary",
                      activeIndex === index ? "border-primary" : null,
                    )}
                    width={60}
                    height={60}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="grid grid-cols-2 justify-between gap-4 py-6">
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Prix de vente
              </span>
              <span className="text-center text-lg font-bold text-black dark:text-white">
                {formatCurrency(variant?.sellingPrice, "USD")}
              </span>
            </div>
            {variant?.isOnSale && (
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                  Prix promotionnel
                </span>
                <span className="text-center text-base font-bold text-black dark:text-white">
                  {formatCurrency(variant?.salePrice, "USD")}
                </span>
              </div>
            )}
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm font-medium text-black/70 dark:text-white/70">
                Quantité en stock
              </span>
              <span className="text-center text-lg font-bold text-black dark:text-white">
                {formatNumber(variant?.inventoryCount)}
              </span>
            </div>
          </div>

          <div className="overflow-hidden bg-gray shadow sm:rounded-lg">
            <div className="flex items-center justify-between px-4 py-5 sm:px-6">
              <div className="">
                <h3 className="text-gray-900 text-lg font-medium leading-6">
                  Attributs de la variante
                </h3>
                <p className="text-gray-500 mt-1 max-w-2xl text-base">
                  List des attributs de la variante
                </p>
              </div>
            </div>
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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
