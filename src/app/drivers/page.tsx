"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import DriversStatsTable from "@/components/Tables/DriversStats";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";

const Drivers = () => {
  const { data, isLoading, error } = useSWR(
    "/api/v1/livraisons/stats/drivers",
    fetcher,
  );
  const stats = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les livreurs" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : stats?.length > 0 ? (
          <DriversStatsTable data={stats} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Statistiques non disponible
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Les statistiques de livreurs seront affichées ici
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Drivers;
