import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "@/css/SwiperGallery.css";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductInformationsProps {
  product: any;
}

const ProductInformations: React.FC<ProductInformationsProps> = ({
  product,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <section className="relative py-10 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="pro-detail order-last flex w-full flex-col justify-center max-lg:mx-auto max-lg:max-w-[608px] lg:order-none">
            <p className="mb-4 text-lg font-medium text-primary">
              {product?.category?.name} &nbsp; / &nbsp;{" "}
              {product?.subCategory?.name ?? null}
            </p>
            <h2 className="font-manrope text-gray-900 mb-2 text-3xl font-bold leading-10">
              {product?.name}
            </h2>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center">
              <h6 className="font-manrope text-gray-900 border-gray-200 mr-5 pr-5 text-2xl font-semibold leading-9 sm:border-r">
                <span className={cn(product.isOnSale && "line-through")}>
                  {formatCurrency(product.sellingPrice, "USD")}
                </span>{" "}
                {product.isOnSale && (
                  <span className="text-meta-3">
                    {formatCurrency(product.salePrice, "USD")}
                  </span>
                )}
              </h6>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {/* Star Icons */}
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="#FBBF24"
                    >
                      <path d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z" />
                    </svg>
                  ))}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="#F3F4F6"
                  >
                    <path d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z" />
                  </svg>
                </div>
                <span className="text-gray-500 pl-2 text-sm font-normal leading-7">
                  1624 avis
                </span>
              </div>
            </div>
            <p className="text-gray-500 mb-8 text-wrap text-base font-normal">
              {product?.shortDescription}
            </p>
            <div className="block w-full">
              <p className="text-gray-900 mb-4 text-lg font-medium leading-8">
                Bag Color
              </p>
              <div className="relative mb-6 flex items-center justify-start gap-3 md:gap-6">
                {/* Color Options */}
                {["#10B981", "#FBBF24", "#F43F5E", "#2563EB"].map(
                  (color, index) => (
                    <button
                      key={index}
                      className="border-gray-200 rounded-full border p-2.5 transition-all duration-300 hover:border-emerald-500 focus:border-emerald-500"
                    >
                      <svg width="20" height="20" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="20" fill={color} />
                      </svg>
                    </button>
                  ),
                )}
              </div>
              <div className="mb-6 block w-full">
                <p className="text-gray-900 mb-4 text-lg font-medium leading-8">
                  Bag size
                </p>
                <div className="grid grid-cols-2 gap-3 min-[400px]:grid-cols-3">
                  <button className="border-gray-200 text-gray-900 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300 w-full rounded-full border px-1.5 py-2 text-lg font-semibold shadow-sm transition-all duration-300 sm:px-6">
                    56 cm
                  </button>
                  {/* Add more buttons for other sizes */}
                </div>
              </div>
            </div>
          </div>
          {/* Add Image or other section content here */}
          {/* Swiper Gallery Section */}
          <div className="space-y-8">
            {/* Main Image Swiper */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              loop={true}
              modules={[Thumbs, Navigation]}
              thumbs={{ swiper: thumbsSwiper }}
              className="w-full"
            >
              {product?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image?.mediaUrl}
                    alt={`Gallery Image ${index + 1}`}
                    className="h-auto w-full"
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
              {product?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image?.mediaUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="border-gray-50 aspect-square cursor-pointer border-2 object-cover transition-all duration-500 hover:border-primary"
                    width={100}
                    height={100}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInformations;
