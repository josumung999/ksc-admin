"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { fetcher, formatCurrency, formatNumber } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { ProductVariantInventoryElement } from "@/types/productType";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";
interface SelectAndAddVariantProps {
  setPurchasedProducts: React.Dispatch<
    React.SetStateAction<ProductVariantInventoryElement[]>
  >;
  isOpen: boolean;
  productId: string;
}

const SelectAndAddVariant: React.FC<SelectAndAddVariantProps> = ({
  setPurchasedProducts,
  isOpen,
  productId,
}) => {
  const { data, isLoading } = useSWR(
    isOpen ? `/api/v1/productVariants?productId=${productId}` : null,
    fetcher,
  );

  const variantData = data?.data?.records;
  const [variants, setVariants] = useState<ProductVariantInventoryElement[]>(
    [],
  );

  useEffect(() => {
    if (variantData !== undefined) {
      setVariants(variantData);
    }
  }, [variantData]);

  const [quantityError, setQuantityError] = useState<boolean>(false);

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variant: ProductVariantInventoryElement,
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && parseInt(value, 10) > 0) {
      setVariants((el) =>
        el.map((item) =>
          item.id === variant.id
            ? { ...item, quantity: parseInt(value, 10) }
            : item,
        ),
      );
      setQuantityError(false);
    } else {
      setQuantityError(true);
    }
  };

  const incrementQuantity = (variant: ProductVariantInventoryElement) => {
    setVariants((el) =>
      el.map((item) => {
        if (item.id === variant.id) {
          const newQuantity = Number(item?.quantity ?? 0) + 1;
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          } else {
            setQuantityError(true);
          }
        }
        return item;
      }),
    );
  };

  const decrementQuantity = (variant: ProductVariantInventoryElement) => {
    setVariants((el) =>
      el.map((item) => {
        if (item.id === variant.id) {
          const newQuantity = Number(item.quantity ?? 1) - 1;

          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          } else {
            setQuantityError(true);
          }
        }
        return item;
      }),
    );
  };

  let toastDisplayed = false;

  return (
    <div className="mt-2 flex min-h-fit w-full flex-col p-6">
      <h5 className="text-lg font-bold ">Variantes</h5>
      <div className="flex min-h-fit flex-col gap-10">
        {isLoading ? (
          <div className="flex h-fit w-full justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2  border-slate-800 dark:border-slate-50"></div>
          </div>
        ) : variants?.length > 0 ? (
          <ScrollArea className="flex flex-col gap-2 space-y-2">
            {variants?.map((variant: ProductVariantInventoryElement) => (
              <div
                className="mb-2 flex min-h-fit w-full items-start justify-start space-y-2 text-left"
                key={variant.id}
              >
                <div className="w-full rounded-lg border border-slate-400 p-4 dark:border-slate-200">
                  <div className="flex w-full flex-col justify-between gap-4 p-0 pr-4 lg:flex-row lg:items-center">
                    <div className="dark:border-gray-800 flex h-full flex-row items-center gap-4 border-gray  lg:w-[60%] lg:border-r-2">
                      <div className="aspect-square h-28   w-28  overflow-hidden rounded-md">
                        <Image
                          src={variant.images[0].mediaUrl}
                          alt={variant.product.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className=" flex h-full  flex-col justify-between gap-4 ">
                        <h5 className="text-md font-bold text-black dark:text-white">
                          {variant?.product?.name}
                        </h5>
                        <div className="flex flex-col items-start justify-between gap-2">
                          <span className="text-sm font-medium text-black/70 dark:text-white/70">
                            {variant?.attributes?.map(
                              (item: any, key: number) => (
                                <span key={key}>
                                  {`${item?.attribute?.name}: ${item?.value}`}
                                  {key !== variant?.attributes?.length - 1 &&
                                    ", "}
                                </span>
                              ),
                            )}
                          </span>
                          <span className="text-xl text-black dark:text-white"></span>
                          <span className="text-sm font-medium text-black/70 dark:text-white/70">
                            Qté en stock:{" "}
                            <span className="font-bold">
                              {formatNumber(variant.inventoryCount)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-row  items-center justify-between gap-8 lg:w-[40%]">
                      <div className="flex h-full flex-row items-start justify-between gap-8">
                        <div className="flex flex-col items-start justify-between gap-2">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                            Prix
                          </p>
                          <div className="mt-2 flex items-center justify-center">
                            <p className="text-md flex items-center justify-center font-bold text-slate-500 dark:text-slate-300">
                              {formatCurrency(
                                variant.product.sellingPrice,
                                "USD",
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-between gap-2 text-center ">
                          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-300">
                            Quantité
                          </p>
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => decrementQuantity(variant)}>
                              <Minus className="text-red" size={20} />
                            </button>
                            <div className="flex items-center justify-center text-xl font-bold text-slate-500 dark:text-slate-300">
                              <Input
                                size={5}
                                className="p-x-0 w-14"
                                type="text"
                                value={variant.quantity?.toString()}
                                defaultValue={"1"}
                                onChange={(e) =>
                                  handleQuantityChange(e, variant)
                                }
                              />
                            </div>
                            <button onClick={() => incrementQuantity(variant)}>
                              <Plus className="text-green-500" size={20} />
                            </button>

                            {quantityError && (
                              <p className="absolute bottom-3 text-sm text-red lg:bottom-6">
                                vous devez mettre un chiffre
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-row items-end justify-end gap-6">
                        <Button
                          onClick={() => {
                            setPurchasedProducts((el) => {
                              for (let i of el) {
                                if (variant.id === i.id) {
                                  if (!toastDisplayed) {
                                    toast.error("Produit déjà ajouté");
                                    toastDisplayed = true;
                                  }
                                  return el;
                                }
                              }

                              if (!toastDisplayed) {
                                toast.success("Produit ajouté avec succès");
                                toastDisplayed = true;
                              }

                              return [
                                ...el,
                                { ...variant, quantity: variant.quantity ?? 1 },
                              ];
                            });
                          }}
                          variant="outline"
                          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:bg-slate-200 dark:text-black lg:px-8 xl:px-10"
                        >
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <p className="text-slate-500">Aucun Variant trouvé</p>
        )}
      </div>
    </div>
  );
};

export default SelectAndAddVariant;
