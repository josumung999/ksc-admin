"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateVehicleButton } from "@/components/Forms/Vehicles/CreateVehicleButton";
import VehiclesTable from "@/components/Tables/Vehicles";
import { useState } from "react";
import { Pagination } from "@/components/Tables/Pagination";
import FilterVehiclesForm from "@/components/Forms/Vehicles/FilterVehiclesForm";

const Vehicles = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);

  const { data, isLoading, error } = useSWR(
    `/api/v1/vehicles?search=${searchTerm}&status=${statusFilter}`,
    fetcher,
  );
  const vehicles = data?.data?.records;

  const totalPages: number = data?.data?.meta?.totalPages || 1;
  const totalRecords = data?.data?.meta?.total || 0;

  // Another deployment made again

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les véhicules" />
      <FilterVehiclesForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
      />
      {isLoading ? (
        <DataLoader />
      ) : vehicles ? (
        <>
          {vehicles?.length > 0 ? (
            <>
              <VehiclesTable data={vehicles} />
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
                Aucun véhicule trouvé
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Gérez vos véhicules
              </EmptyPlaceholder.Description>
              <CreateVehicleButton />
            </EmptyPlaceholder>
          )}
        </>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon />
          <EmptyPlaceholder.Title>Aucun véhicule trouvé</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Gérez vos véhicules
          </EmptyPlaceholder.Description>
          <CreateVehicleButton />
        </EmptyPlaceholder>
      )}
      <div className="flex min-h-screen flex-col gap-10"></div>
    </DefaultLayout>
  );
};

export default Vehicles;
