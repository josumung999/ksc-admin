"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import {
  cn,
  fetcher,
  formatCurrency,
  formatDate,
  formatNumber,
} from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import LivraisonsTable from "@/components/Tables/Livraisons";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  Bike,
  Check,
  Mail,
  Phone,
  PhoneCall,
  Printer,
  User,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import TrackingCard from "@/components/Cards/TrackingCard";
import { SignLivraisonButton } from "@/components/Forms/Livraisons/SignLivraisonButton";

const ShipmentDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/livraisons/${params.id}`,
    fetcher,
  );
  const livraison = data?.data?.record;

  console.log("Livraison Details: ", livraison);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Details de la livraison" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : livraison ? (
          <div className="grid w-full grid-cols-1 items-start gap-x-4 gap-y-10 md:grid-cols-6">
            <div className="col-span-4 flex flex-col gap-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Détails de la livraison</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Livraison n°:</p>
                    <p>{livraison.id}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Date:</p>
                    <p>{formatDate(livraison.createdAt)}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Statut de la livraison:</p>
                    <Badge
                      className={cn(
                        livraison.status === "PENDING"
                          ? "bg-meta-4 text-whiten"
                          : livraison.status === "DELIVERED"
                            ? "bg-meta-3 text-whiten"
                            : livraison.status === "IN_TRANSIT"
                              ? "bg-meta-5 text-whiten"
                              : "bg-meta-1 text-whiten",
                      )}
                    >
                      {livraison.status === "PENDING"
                        ? "En attente"
                        : livraison.status === "DELIVERED"
                          ? "Livrée"
                          : livraison.status === "IN_TRANSIT"
                            ? "En transit"
                            : "Annulée"}
                    </Badge>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Statut de paiement:</p>
                    <Badge
                      className={cn(
                        livraison.status === "PENDING"
                          ? "bg-meta-4 text-whiten"
                          : livraison.status === "PAID"
                            ? "bg-meta-3 text-whiten"
                            : "bg-meta-1 text-whiten",
                      )}
                    >
                      {livraison.order?.paymentStatus === "PENDING"
                        ? "En attente"
                        : livraison.order?.paymentStatus === "PAID"
                          ? "Payé"
                          : "Remboursé"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations de la commande</CardTitle>
                  <CardDescription>Produits commandés</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                  {livraison?.order?.items?.map((item: any, key: number) => (
                    <Card
                      key={key}
                      className="rounded-none border-none shadow-none"
                    >
                      <CardContent className="grid grid-cols-1 gap-x-4 px-0 py-6 md:grid-cols-6">
                        <div className="col-span-4">
                          <div className="flex flex-col justify-start gap-4 md:flex-row md:items-center md:border-r-2 md:border-gray">
                            <div className="aspect-square h-24 w-24  overflow-hidden rounded-md">
                              <Image
                                src={item?.productVariant?.coverImage?.mediaUrl}
                                alt={item?.productVariant.product.name}
                                width={100}
                                height={100}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col justify-between py-3 md:h-full">
                              <div className="flex flex-row items-center justify-between">
                                <h5 className="text-xl font-bold text-black dark:text-white">
                                  {item?.productVariant.product.name}
                                </h5>
                              </div>
                              <div className="flex flex-row items-center justify-between gap-2">
                                <span className="text-sm font-medium text-black/70 dark:text-white/70">
                                  {item?.productVariant?.attributes?.map(
                                    (item: any, key: number) => (
                                      <span key={key}>
                                        {`${item?.attribute?.name}: ${item?.value}`}
                                        {key !==
                                          item?.productVariant?.attributes
                                            ?.length -
                                            1 && ", "}
                                      </span>
                                    ),
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 flex h-full flex-col justify-center">
                          <div className="flex flex-row items-center justify-between">
                            <Badge className="" variant="outline">
                              {`${formatNumber(item?.quantity)} x ${formatCurrency(item?.productVariant?.isOnSale ? item?.productVariant?.salePrice : item?.productVariant?.sellingPrice, "USD")}`}
                            </Badge>

                            <h1 className="text-lg font-bold">
                              {formatCurrency(item?.totalPrice, "USD")}
                            </h1>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Informations du client</CardTitle>
                  <CardDescription>Coordonnées du client</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Nom complet:</p>
                    <p>{livraison?.order?.client?.fullName}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Téléphone:</p>
                    <p>{livraison?.order?.clientPhoneNumber}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Email:</p>
                    <p>{livraison?.order?.clientEmail}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Adresse:</p>
                    <p>{livraison?.order?.clientAddress}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paiement et livraison</CardTitle>
                  <CardDescription>
                    Informations de paiement et frais de livraison
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Total article (s):</p>
                    <p className="font-bold">
                      {formatNumber(
                        livraison?.order?.items?.reduce(
                          (acc: any, item: any) => acc + item.quantity,
                          0,
                        ),
                      )}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Cout total:</p>
                    <p className="font-bold">
                      {formatCurrency(livraison?.order?.totalAmount, "USD")}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Reduction:</p>
                    <p className="font-bold text-meta-3">
                      {" - " +
                        formatCurrency(
                          livraison?.order?.discountAmount ?? 0,
                          "USD",
                        )}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Frais de livraison:</p>
                    <p className="font-bold">
                      {formatCurrency(
                        livraison?.order?.shippingAmount ?? 3.5,
                        "USD",
                      )}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4 text-lg font-extrabold">
                    <p>Total à payer:</p>
                    <p>
                      {formatCurrency(
                        livraison?.order?.totalAmount + 3.5,
                        "USD",
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2 flex flex-col gap-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="flex w-full flex-row items-center justify-between space-x-2">
                  <Button size="sm" variant="outline">
                    <Printer className="mr-2 h-5 w-5" />
                    Imprimer
                  </Button>
                  <SignLivraisonButton client={livraison?.order?.client} />
                  <Button size="sm" variant="destructive">
                    <X className="mr-2 h-5 w-5" />
                    Annuler
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations sur le livreur</CardTitle>
                </CardHeader>
                <CardContent className="flex w-full flex-col items-center justify-center gap-y-4">
                  <div className="flex w-full flex-row items-center justify-between">
                    <User className="h-5 w-5" />
                    <p className="text-black dark:text-white">
                      {`${livraison?.vehicle?.driver?.firstName} ${livraison?.vehicle?.driver?.middleName ?? ""} ${livraison?.vehicle?.driver?.lastName}`}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Phone className="h-5 w-5" />
                    <p className="text-black dark:text-white">
                      {livraison?.vehicle?.driver?.phoneNumber}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Mail className="h-5 w-5" />
                    <p className="text-black dark:text-white">
                      {livraison?.vehicle?.driver?.email}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between">
                    <Bike className="h-5 w-5" />
                    <p className="text-black dark:text-white">
                      {`${livraison?.vehicle?.name}, ${livraison?.vehicle?.brand ? livraison?.vehicle?.brand + ", " : " "} ${livraison?.vehicle?.model}, ${livraison?.vehicle?.immatriculation}`}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-between">
                  <Button className="bg-primary">
                    <PhoneCall className="mr-2 h-5 w-5" />
                    Contacter
                  </Button>
                  <Button className="bg-meta-6 text-black">
                    <ArrowLeftRight className="mr-2 h-5 w-5" />
                    Changer Livreur
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardContent className="flex w-full flex-col items-center justify-center gap-y-4 py-6">
                  <TrackingCard
                    trackingHistory={livraison.order.trackingHistory}
                    clientAddress={livraison.order.client?.address}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune livraison trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              La livraison recherchée est introuvable
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ShipmentDetails;
