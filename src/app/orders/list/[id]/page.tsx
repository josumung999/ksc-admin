"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Edit,
  Mail,
  Phone,
  Printer,
  Trash2,
  User,
} from "lucide-react";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import useSWR, { mutate } from "swr";
import {
  LivraisonStatus,
  OrderItem,
  OrderTrackingStatus,
  OrderType,
  PaymentStatus,
} from "@/types/getOrderType";
import DataPagination from "@/components/common/pagination";
import { fetcher, formatCurrency, formatDate } from "@/lib/utils";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { paymentMethodEnum } from "@/types/orderInfoType";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "@/hooks/use-toast";
import UpdateOrder from "@/components/Forms/orders/UpdateOrderButton";
import { clientType } from "@/types/clientType";
import { ProductVariantInventoryElement } from "@/types/productType";
import { AuthStore } from "@/store/authStore";
import { toast as toastReact } from "react-toastify";

import axios from "axios";

const Orders: React.FC<{ params: any }> = ({ params }) => {
  const { id } = params;
  const { user } = AuthStore.useState();

  const { data, isLoading, error } = useSWR(`/api/v1/orders/${id}`, fetcher);

  const [ordersData, setOrdersData] = useState<OrderType | null>(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  useEffect(() => {
    setOrdersData(data?.data?.record);
  }, [data]);

  console.log(ordersData);

  // Calculate the total discount
  let totalDiscount = 0;

  if (ordersData?.items) {
    ordersData.items.forEach((item) => {
      const { sellingPrice, salePrice } = item.productVariant;
      const effectiveSalePrice = salePrice ?? sellingPrice; // If no sale, consider original price
      const discountPerItem =
        (sellingPrice - effectiveSalePrice) * item.quantity;
      totalDiscount += discountPerItem > 0 ? discountPerItem : 0;
    });
  }

  const [isOpen, setIsOpen] = useState({
    orderItem: true,
    orderSummary: true,
  });

  function deletePuchacedProduct(variantId: string) {
    setOrdersData((el: OrderType | null) => {
      if (el) {
        // Create a new object with the filtered items to trigger a re-render
        return {
          ...el,
          items: el.items.filter((item) => item.id !== variantId),
        };
      }
      return null;
    });

    toast({
      title: "Modifications",
      description: "Mettez à jour la commande pour voir les modifications",
    });
  }

  function editPurchacedProduct(e: any, variantId: string) {
    setOrdersData((el: OrderType | null) => {
      if (el) {
        return {
          ...el,
          items: el.items.map((item: OrderItem) => {
            if (item.id === variantId) {
              return {
                ...item,
                quantity:
                  isNaN(parseInt(e.target.value)) ||
                  parseInt(e.target.value) <= 0
                    ? 1
                    : parseInt(e.target.value),
              };
            }
            return item;
          }),
        };
      }

      return null;
    });

    toast({
      title: "Modifications",
      description: "Mettez à jour la commande pour voir les modifications",
    });
  }

  async function handleUpdateOrderTracking(status: OrderTrackingStatus) {
    try {
      setIsLoadingUpdate(true);
      const { data } = await axios({
        method: "put",
        url: `/api/v1/orders/${ordersData?.id}`,
        data: {
          orderTracking: {
            status,
          },
        },
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });

      mutate(`/api/v1/orders/${ordersData?.id}`);
    } catch (error) {
      setIsLoadingUpdate(false);
      toastReact.error("Une erreur s'est produite");
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  //this logic must be updated
  const nextStatus =
    ordersData?.trackingHistory[0]?.status === OrderTrackingStatus.DRAFT
      ? OrderTrackingStatus.CONFIRMED
      : OrderTrackingStatus.PACKED;

  return (
    <DefaultLayout>
      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : ordersData ? (
          <div className="flex w-full flex-col gap-10">
            <div className="flex w-full flex-col gap-4">
              <div className="md:felx-row flex w-full flex-col gap-6">
                <h5 className="text-xl font-semibold">
                  Order ID: {ordersData.id}
                </h5>
                <div className="flex gap-3">
                  <p
                    className={`flex h-fit items-center justify-center rounded-lg ${ordersData.paymentStatus === PaymentStatus.PAID ? "bg-green-600" : ordersData.paymentStatus === PaymentStatus.REFUNDED ? "bg-rose-500" : "bg-yellow-600"} bg-opacity-15 px-4 py-1 text-center text-sm font-medium ${ordersData.paymentStatus === PaymentStatus.PAID ? "text-green-500 dark:bg-green-400" : ordersData.paymentStatus === PaymentStatus.REFUNDED ? "text-rose-500 dark:bg-rose-400" : "text-yellow-500 dark:bg-yellow-400"} dark:bg-opacity-15`}
                  >
                    Paiement{" "}
                    {ordersData.paymentStatus === PaymentStatus.PENDING
                      ? "en attente"
                      : ordersData.paymentStatus === PaymentStatus.REFUNDED
                        ? "Remboursé"
                        : "payé"}
                  </p>
                  <p
                    className={`flex h-fit items-center justify-center rounded-lg ${ordersData.livraison?.status === LivraisonStatus.PENDING ? "bg-green-600" : ordersData.livraison?.status === LivraisonStatus.CANCELLED ? "bg-rose-500" : "bg-yellow-600"} bg-opacity-15 px-4 py-1 text-center text-sm font-medium ${ordersData.livraison?.status === LivraisonStatus.PENDING ? "text-green-500 dark:bg-green-400" : ordersData.livraison?.status === LivraisonStatus.CANCELLED ? "text-rose-500 dark:bg-rose-400" : "text-yellow-500 dark:bg-yellow-400"} dark:bg-opacity-15`}
                  >
                    Livraison{" "}
                    {ordersData.livraison?.status === LivraisonStatus.DELIVERED
                      ? "faite"
                      : ordersData.livraison?.status ===
                          LivraisonStatus.CANCELLED
                        ? "annulé"
                        : ordersData.livraison?.status ===
                            LivraisonStatus.IN_TRANSIT
                          ? "En transit"
                          : "en attente"}
                  </p>
                </div>
              </div>
              <h4 className="text-gray-500 text-sm">
                {formatDate(ordersData.createdAt)}{" "}
                {new Date(ordersData.createdAt).getHours()}:
                {new Date(ordersData.createdAt).getMinutes()}
              </h4>
            </div>

            <div className="flex w-full flex-col gap-10 lg:flex-row">
              <div className="flex w-full flex-col gap-10 ">
                {/* order items  */}
                <Card className="w-full ">
                  <CardContent className="flex w-full flex-col p-0">
                    <div className="flex w-full items-center justify-between p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-semibold">
                          Produits commandés
                        </h4>
                        <p
                          className={`flex h-fit items-center justify-center rounded-lg ${ordersData.livraison?.status === LivraisonStatus.PENDING ? "bg-green-600" : ordersData.livraison?.status === LivraisonStatus.CANCELLED ? "bg-rose-500" : "bg-yellow-600"} bg-opacity-15 px-4 py-1 text-center text-sm font-medium ${ordersData.livraison?.status === LivraisonStatus.PENDING ? "text-green-500 dark:bg-green-400" : ordersData.livraison?.status === LivraisonStatus.CANCELLED ? "text-rose-500 dark:bg-rose-400" : "text-yellow-500 dark:bg-yellow-400"} dark:bg-opacity-15`}
                        >
                          Livraison{" "}
                          {ordersData.livraison?.status ===
                          LivraisonStatus.DELIVERED
                            ? "faite"
                            : ordersData.livraison?.status ===
                                LivraisonStatus.CANCELLED
                              ? "annulé"
                              : ordersData.livraison?.status ===
                                  LivraisonStatus.IN_TRANSIT
                                ? "En transit"
                                : "en attente"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setIsOpen((el) => ({
                            ...el,
                            orderItem: !el.orderItem,
                          }))
                        }
                        className="rounded-full p-2 duration-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <ChevronDown
                          size={20}
                          className={`rounded-full font-normal duration-200 ${!isOpen.orderItem ? "" : "rotate-180"} `}
                        />
                      </button>
                    </div>

                    {/* purchached product  */}
                    {isOpen.orderItem &&
                      ordersData.items.map((variant: OrderItem, key) => (
                        <div key={key + "hey"} className="w-full ">
                          <div className="flex w-full flex-col justify-between gap-4 p-0 pr-4 sm:flex-row sm:items-center">
                            {}
                            <div className="dark:border-gray-800 flex h-full flex-col items-start gap-4 border-gray p-4 sm:w-[60%]  sm:flex-row sm:items-center ">
                              <div className="aspect-square h-28 w-28   overflow-hidden  rounded-md bg-black">
                                <Image
                                  src={
                                    variant?.productVariant?.images[0].mediaUrl
                                  }
                                  alt={variant?.productVariant?.product?.name}
                                  width={100}
                                  height={100}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className=" flex h-full  flex-col justify-between gap-2 ">
                                <h5 className="text-md font-bold text-black dark:text-white">
                                  {variant?.productVariant?.product?.name}
                                </h5>
                                <div className="flex flex-col items-start justify-between gap-2">
                                  <span className="text-sm font-medium text-black/70 dark:text-white/70">
                                    {variant?.productVariant?.attributes?.map(
                                      (item: any, key: number) => (
                                        <span key={key}>
                                          {`${item?.attribute?.name}: ${item?.value}`}
                                          {key !==
                                            variant?.productVariant?.attributes
                                              ?.length -
                                              1 && ", "}
                                        </span>
                                      ),
                                    )}
                                  </span>
                                  <span className="text-xl text-black dark:text-white"></span>
                                </div>
                                <div className="flex flex-auto  gap-2">
                                  <p className="text-sm font-medium text-black/70 dark:text-white/70">
                                    Prix unitaire:{" "}
                                    {formatCurrency(
                                      variant?.productVariant?.sellingPrice,
                                      "USD",
                                    )}
                                  </p>
                                  {variant?.productVariant?.isOnSale && (
                                    <p className="text-sm font-medium text-black/70 dark:text-white/70">
                                      Rabais:{" "}
                                      {formatCurrency(
                                        variant?.productVariant?.sellingPrice -
                                          variant?.productVariant?.salePrice,
                                        "USD",
                                      )}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="relative flex h-full w-full  flex-col justify-between gap-8 p-4 pt-0 sm:sm:w-[40%] sm:flex-row sm:items-center sm:p-0">
                              <div className="dark:border-gray-800 border-gray-300 absolute -left-4 h-full w-full opacity-20 sm:border-l-2"></div>
                              <div className="relative flex h-full flex-row items-start gap-20 sm:justify-between sm:gap-8">
                                <div className="flex flex-col items-center justify-between gap-2">
                                  <p className="text-sm text-slate-500 dark:text-slate-300">
                                    Qté
                                  </p>
                                  <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                                    {variant.quantity ?? 1}
                                  </p>
                                </div>

                                <div className="flex flex-col items-center justify-between gap-2">
                                  <p className="text-sm text-slate-500 dark:text-slate-300">
                                    Prix total
                                  </p>
                                  <p className="text-xl font-bold text-slate-500 dark:text-slate-300">
                                    {formatCurrency(
                                      variant?.productVariant?.isOnSale
                                        ? variant?.productVariant?.salePrice
                                        : variant?.productVariant
                                            ?.sellingPrice *
                                            (variant.quantity ?? 1),
                                      "USD",
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="relative flex w-full flex-row items-end justify-end gap-4">
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
                                          onChange={(e) => {
                                            editPurchacedProduct(e, variant.id);
                                          }}
                                          type="number"
                                          value={variant.quantity}
                                        />
                                      </CardContent>
                                    </Card>
                                  </PopoverContent>
                                </Popover>

                                <Button
                                  size={"sm"}
                                  className="border-red dark:border-red"
                                  variant="outline"
                                  onClick={() =>
                                    deletePuchacedProduct(variant.id)
                                  }
                                >
                                  <Trash2 className="text-red" size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="flex w-full flex-row items-center justify-between bg-slate-200 p-4 dark:bg-slate-800">
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        Gerer vos produits commandés
                      </p>

                      <UpdateOrder
                        client={ordersData?.client as clientType}
                        orderData={{
                          comment: "to modify",
                          date: ordersData.createdAt,
                          paymentMethod:
                            ordersData.paymentMethod as unknown as paymentMethodEnum,
                          id: ordersData.id,
                        }}
                        updated={true}
                        purchasedProducts={
                          ordersData.items as unknown as ProductVariantInventoryElement[]
                        }
                        label="Mettre à jour la commande"
                        disabled={
                          isLoadingUpdate ||
                          ordersData.paymentStatus === PaymentStatus.PAID
                        }
                        //this disabled logic must be updated
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* order summary  */}
                <Card className="w-full ">
                  <CardContent className="flex w-full flex-col p-0">
                    <div className="flex w-full items-center justify-between p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-semibold">
                          Produits commandés
                        </h4>
                        <p
                          className={`flex h-fit items-center justify-center rounded-lg ${ordersData.paymentStatus === PaymentStatus.PAID ? "bg-green-600" : ordersData.paymentStatus === PaymentStatus.REFUNDED ? "bg-rose-500" : "bg-yellow-600"} bg-opacity-15 px-4 py-1 text-center text-sm font-medium ${ordersData.paymentStatus === PaymentStatus.PAID ? "text-green-500 dark:bg-green-400" : ordersData.paymentStatus === PaymentStatus.REFUNDED ? "text-rose-500 dark:bg-rose-400" : "text-yellow-500 dark:bg-yellow-400"} dark:bg-opacity-15`}
                        >
                          Paiement{" "}
                          {ordersData.paymentStatus === PaymentStatus.PENDING
                            ? "en attente"
                            : ordersData.paymentStatus ===
                                PaymentStatus.REFUNDED
                              ? "Remboursé"
                              : "payé"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setIsOpen((el) => ({
                            ...el,
                            orderSummary: !el.orderSummary,
                          }))
                        }
                        className="rounded-full p-2 duration-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <ChevronDown
                          size={20}
                          className={`rounded-full font-normal duration-200 ${!isOpen.orderSummary ? "" : "rotate-180"} `}
                        />
                      </button>
                    </div>

                    {/* purchached product  */}
                    {isOpen.orderSummary && (
                      <div className="w-full flex-col space-y-6 p-4 sm:space-y-3">
                        <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
                          <p className="w-full text-sm font-medium text-slate-500 dark:text-slate-300 sm:w-[40%]">
                            Total des produits commandés
                          </p>
                          <div className="flex w-full flex-row justify-between gap-2 sm:w-[40%]">
                            <p className=" text-start text-sm font-medium text-slate-500 dark:text-slate-300">
                              {ordersData.items.length} produit(s)
                            </p>
                            <p className="text-sm font-bold text-slate-500  dark:text-slate-200">
                              {formatCurrency(ordersData.totalAmount, "USD")}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
                          <p className="w-full text-sm font-medium text-slate-500 dark:text-slate-300 sm:w-[40%]">
                            Rabbais Total{" "}
                            <span className="ml-2 text-xs text-slate-500 dark:text-slate-300">
                              Nouveau client
                            </span>
                          </p>
                          <div className="flex w-full flex-row justify-between gap-2 sm:w-[40%]">
                            <p className=" text-start text-sm font-medium text-slate-500 dark:text-slate-300">
                              -{formatCurrency(totalDiscount, "USD")}
                            </p>
                            <p className="text-sm font-bold text-slate-500  dark:text-slate-200">
                              {formatCurrency(totalDiscount, "USD")}
                            </p>
                          </div>
                        </div>
                        {/* shipping cost  */}
                        <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
                          <p className="w-full text-sm font-medium text-slate-500 dark:text-slate-300 sm:w-[40%]">
                            Frais de livraison
                          </p>
                          <div className="flex w-full flex-row justify-between gap-2 sm:w-[40%]">
                            <p className=" text-start text-sm font-medium text-slate-500 dark:text-slate-300">
                              Livraison gratuite
                            </p>
                            <p className="text-sm font-bold text-slate-500  dark:text-slate-200">
                              {formatCurrency(0, "USD")}
                            </p>
                          </div>
                        </div>

                        {/* total */}
                        <div className="flex w-full flex-row items-start justify-between sm:items-center">
                          <p className="w-full text-sm font-bold text-slate-500 dark:text-slate-300 sm:w-[40%]">
                            Total
                          </p>

                          <p className=" text-start text-sm font-bold text-slate-500 dark:text-slate-300">
                            {formatCurrency(
                              ordersData.totalAmount - totalDiscount,
                              "USD",
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex w-full flex-row items-center justify-between bg-slate-200 p-4 dark:bg-slate-800">
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        Gerer la facture
                      </p>
                      {/* <Button
                        size={"lg"}
                        variant="outline"
                        className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-8 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-8"
                      >
                        Collecter le payement
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-2 flex flex-col gap-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex w-full flex-row items-center justify-between space-x-2">
                    <Button size="sm" variant="outline">
                      <Printer className="mr-2 h-5 w-5" />
                      Imprimer
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-meta-3 text-whiten hover:text-meta-3/90 dark:bg-meta-3"
                      // disabled={}
                      onClick={() => handleUpdateOrderTracking(nextStatus)}
                    >
                      <Check className="mr-2 h-5 w-5 " />
                      {ordersData?.trackingHistory[0]?.status ===
                      OrderTrackingStatus.DRAFT
                        ? "Confirmer"
                        : "Prêt pour la livraison"}
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center justify-center"
                    >
                      <DotsHorizontalIcon />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informations sur le client</CardTitle>
                  </CardHeader>

                  <CardContent className="flex w-full flex-col items-center justify-center gap-y-4">
                    <div className="flex w-full flex-row items-center justify-between">
                      <User className="h-5 w-5" />
                      <p className="text-black dark:text-white">
                        {ordersData?.client?.fullName}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <Phone className="h-5 w-5" />
                      <p className="text-black dark:text-white">
                        {ordersData?.clientPhoneNumber}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <Mail className="h-5 w-5" />
                      <p className="text-black dark:text-white">
                        {ordersData?.clientEmail ?? "----"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Informations sur le livreur</CardTitle>
                  </CardHeader>
                  {!ordersData.livraison ? (
                    <CardContent>
                      <p>Pas de livreur pour cette commande</p>
                    </CardContent>
                  ) : (
                    <CardContent className="flex w-full flex-col items-center justify-center gap-y-4">
                      <div className="flex w-full flex-row items-center justify-between">
                        <User className="h-5 w-5" />
                        <p className="text-black dark:text-white">
                          {`${ordersData.livraison?.vehicle?.driver?.firstName} ${ordersData.livraison?.vehicle?.driver?.middleName ?? ""} ${ordersData.livraison?.vehicle?.driver?.lastName}`}
                        </p>
                      </div>
                      <div className="flex w-full flex-row items-center justify-between">
                        <Phone className="h-5 w-5" />
                        <p className="text-black dark:text-white">
                          {ordersData.livraison?.vehicle?.driver?.phoneNumber}
                        </p>
                      </div>
                      <div className="flex w-full flex-row items-center justify-between">
                        <Mail className="h-5 w-5" />
                        <p className="text-black dark:text-white">
                          {ordersData.livraison?.vehicle?.driver?.email}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune commande trouvée
            </EmptyPlaceholder.Title>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Orders;
