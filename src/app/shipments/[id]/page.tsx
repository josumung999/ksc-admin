"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { cn, fetcher, formatDate } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import LivraisonsTable from "@/components/Tables/Livraisons";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          <div className="grid w-full grid-cols-1 items-start gap-x-4 gap-y-10 md:grid-cols-5">
            <div className="col-span-3 flex flex-col gap-y-4">
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
