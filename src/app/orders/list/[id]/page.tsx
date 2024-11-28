"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrdersTable from "@/components/Tables/Orders";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, Edit, Plus, Trash2 } from "lucide-react";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import useSWR from "swr";
import { OrderType } from "@/types/getOrderType";
import DataPagination from "@/components/common/pagination";
import { fetcher, formatCurrency } from "@/lib/utils";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const Orders = () => {
  //   const { data, isLoading, error } = useSWR(
  //     `/api/v1/orders/`,
  //     fetcher,
  //   );

  //   const orders = data?.data?.records;
  //   const ordersData: OrderType[] = orders?.orders;

  const [isOpen, setIsOpen] = useState(false);
  const variant = {
    product: {
      name: "Ventilateur",
    },
    attributes: [
      {
        attribute: {
          name: "Couleur",
        },
        value: "Rouge",
      },
    ],
    isOnSale: false,
    sellingPrice: 100,
    salePrice: 0,
    quantity: 1,
  };

  return (
    <DefaultLayout>
      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full gap-6">
            <h5 className="text-xl font-semibold">Order ID: 331102b3993hd</h5>
            <div className="flex gap-3">
              <p className="flex h-fit items-center justify-center rounded-lg bg-green-600 bg-opacity-15 px-4 py-1 text-center text-sm font-medium text-green-500 dark:bg-green-400 dark:bg-opacity-15">
                Paiment en attente
              </p>
              <p className="flex h-fit items-center justify-center rounded-lg bg-yellow-600 bg-opacity-15 px-4 py-1 text-center text-sm font-medium text-yellow-500 dark:bg-yellow-400 dark:bg-opacity-15">
                Livraison en cours
              </p>
            </div>
          </div>
          <h4 className="text-gray-500 text-sm">Le 30/10/2024 à 10:00</h4>
        </div>

        {/* about the order  */}
        <Card className="w-full ">
          <CardContent className="flex w-full flex-col p-0">
            <div className="flex w-full items-center justify-between p-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-semibold">Produits commandés</h4>
                <p className="flex h-fit w-fit items-center justify-center  rounded-lg bg-yellow-600 bg-opacity-15 px-4 py-1 text-center text-sm font-medium text-yellow-500 dark:bg-yellow-400 dark:bg-opacity-15">
                  Livraison en cours
                </p>
              </div>
              <button
                onClick={() => setIsOpen((el) => !el)}
                className="rounded-full p-2 duration-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <ChevronDown
                  size={20}
                  className={`rounded-full font-normal duration-200 ${!isOpen ? "" : "rotate-180"} `}
                />
              </button>
            </div>

            {/* purchached product  */}
            {isOpen && (
              <div className="w-full ">
                <div className="flex w-full flex-col justify-between gap-4 p-0 pr-4 sm:flex-row sm:items-center">
                  <div className="dark:border-gray-800 flex h-full flex-col items-start gap-4 border-gray sm:w-[60%] sm:flex-row  sm:items-center sm:border-r-2">
                    <div className="aspect-square h-28   w-28  overflow-hidden rounded-md">
                      {/* <Image
                        src={variant.images[0].mediaUrl}
                        alt={variant.product.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      /> */}
                    </div>
                    <div className=" flex h-full  flex-col justify-between gap-2 ">
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
                      </div>
                      <div className="flex flex-auto  gap-2">
                        <p className="text-sm font-medium text-black/70 dark:text-white/70">
                          Prix unitaire:{" "}
                          {formatCurrency(variant?.sellingPrice, "USD")}
                        </p>
                        {variant.isOnSale && (
                          <p className="text-sm font-medium text-black/70 dark:text-white/70">
                            Rabais:{" "}
                            {formatCurrency(
                              variant?.sellingPrice - variant?.salePrice,
                              "USD",
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex h-full flex-col  justify-between gap-8 sm:w-[40%] sm:flex-row sm:items-center">
                    <div className="flex h-full flex-row items-start gap-20 sm:justify-between sm:gap-8">
                      <div className="flex flex-col items-start justify-between gap-2">
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                          Qté
                        </p>
                        <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                          {variant.quantity ?? 1}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-between gap-2">
                        <p className="text-sm text-slate-500 dark:text-slate-300">
                          Prix total
                        </p>
                        <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                          {formatCurrency(
                            variant?.isOnSale
                              ? variant?.salePrice
                              : variant.sellingPrice * (variant.quantity ?? 1),
                            "USD",
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row items-end justify-end gap-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button size={"sm"} variant="outline">
                            <Edit size={16} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Card className="flex flex-col gap-4 pt-3 ">
                            <CardTitle className="pl-4 font-medium text-slate-400">
                              Modifier la Quantité
                            </CardTitle>
                            <CardContent>
                              <Input
                                type="number"
                                defaultValue={variant.quantity}
                              />
                            </CardContent>
                          </Card>
                        </PopoverContent>
                      </Popover>

                      <Button
                        size={"sm"}
                        className="border-red dark:border-red"
                        variant="outline"
                      >
                        <Trash2 className="text-red" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex w-full flex-row items-center justify-between bg-slate-200 p-4">
              <p className="text-sm text-slate-500">
                Gerer vos produits commandés
              </p>
              <Button
                size={"sm"}
                variant="outline"
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-8 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-8"
              >
                Creer un label de livraison
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default Orders;
