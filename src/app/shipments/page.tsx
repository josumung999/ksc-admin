"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import LivraisonsTable from "@/components/Tables/Livraisons";

const Shipments = () => {
  const { data, isLoading, error } = useSWR("/api/v1/livraisons", fetcher);
  const livraisons = data?.data?.records;

  console.log("Livraisons", livraisons);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les livraisons" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : livraisons?.length > 0 ? (
          <LivraisonsTable data={livraisons} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune livraison trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              La liste des livraisons se remplira dès que des nouvelles
              commandes sont prises en charge
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Shipments;
