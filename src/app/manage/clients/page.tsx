"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateClientButton } from "@/components/Forms/Clients/CreateClientButton";
import Clients from "@/components/Tables/Clients";
import { clientType } from "@/types/clientType";
import React from "react";
import { useState } from "react";
import DataPagination from "@/components/common/pagination/index";
import { SearchBar } from "@/components/common/searchBar";
import FilterClientsForm from "@/components/Forms/Clients/FilterClientForm";
import { Pagination } from "@/components/Tables/Pagination";

const ClientsPage = ({ searchParams }: { searchParams: any }) => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);

  //default of searchName Params is ""
  const searchName: string = searchParams.searchName ?? "";

  const { data, isLoading, error } = useSWR(
    `/api/v1/clients?page=${currentPage}&searchName=${searchName}`,
    fetcher,
  );
  const clients: clientType[] = data?.data?.records;
  const totalPages: number = data?.data?.meta?.totalPages || 1;
  const totalRecords = data?.data?.total || 0;

  console.log("clients", clients);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les clients" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateClientButton />
      </div>

      <FilterClientsForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : clients?.length > 0 ? (
          <>
            <Clients data={clients} />
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
            <EmptyPlaceholder.Title>Aucun client trouvé</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucun client trouvé
            </EmptyPlaceholder.Description>
            <CreateClientButton />
          </EmptyPlaceholder>
        )}
      </div>

      <DataPagination totalPages={totalPages} />
    </DefaultLayout>
  );
};

export default ClientsPage;
