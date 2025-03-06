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
import { useState } from "react";
import FilterLivraisonsForm from "@/components/Forms/Livraisons/FilterLivraisonsForm";
import { Pagination } from "@/components/Tables/Pagination";

const Shipments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [driverIdFilter, setDriverIdFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");

  const { data, isLoading } = useSWR(
    `/api/v1/livraisons?${statusFilter ? `status=${statusFilter}` : ""}&page=${currentPage}&limit=${limitPerPage}${
      driverIdFilter ? `&driverId=${driverIdFilter}` : ""
    }${searchTerm ? `&search=${searchTerm}` : ""}`,
    fetcher,
  );

  const totalRecords = data?.data?.totalRecords || 0;
  const totalPages = data?.data?.totalPages || 1;

  // Remove local records state and use SWR data directly
  const members = data?.data?.records || [];
  const {
    data: driversData,
    isLoading: isLoadingDrivers,
    error: errorDrivers,
  } = useSWR("/api/v1/livraisons/stats/drivers", fetcher);

  const drivers = driversData?.data?.records;
  const livraisons = data?.data?.records;

  console.log("Livraisons", livraisons);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les livraisons" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading || isLoadingDrivers ? (
          <DataLoader />
        ) : drivers ? (
          <>
            <FilterLivraisonsForm
              driverIdFilter={driverIdFilter}
              statusFilter={statusFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              drivers={drivers}
              setCurrentPage={setCurrentPage}
              setDriverIdFilter={setDriverIdFilter}
              setStatusFilter={setStatusFilter}
            />

            {livraisons?.length > 0 ? (
              <>
                <LivraisonsTable data={livraisons} />
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
                  Aucune livraison trouvée
                </EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  La liste des livraisons se remplira dès que des nouvelles
                  commandes sont prises en charge
                </EmptyPlaceholder.Description>
              </EmptyPlaceholder>
            )}
          </>
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
