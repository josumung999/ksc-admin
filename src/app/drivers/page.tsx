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
import { useState } from "react";
import { Pagination } from "@/components/Tables/Pagination";

const Drivers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);

  const { data, isLoading, error } = useSWR(
    `/api/v1/livraisons/stats/driverspage=${currentPage}&limit=${limitPerPage}`,
    fetcher,
  );
  const stats = data?.data?.records;
  const totalPages = data?.data?.meta?.totalPages || 1;
  const totalRecords = data?.data?.meta?.total || 0;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les livreurs" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : stats?.length > 0 ? (
          <>
            <DriversStatsTable data={stats} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limitPerPage={limitPerPage}
              onPageChange={setCurrentPage}
            />
          </>
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
