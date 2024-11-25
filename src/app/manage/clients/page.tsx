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
import DataPagination from "@/components/common/pagination/index";
import { SearchBar } from "@/components/common/searchBar";
const ClientsPage = ({ searchParams }: { searchParams: any }) => {
  //defaut of pagnation is 1
  const page: number = searchParams.page ?? 1;

  //default of searchName Params is ""
  const searchName: string = searchParams.searchName ?? "";

  const { data, isLoading, error } = useSWR(
    `/api/v1/clients?page=${page}&searchName=${searchName}`,
    fetcher,
  );
  const clients: clientType[] = data?.data?.records;

  console.log(clients);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les clients" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateClientButton />
      </div>

      <SearchBar
        link="/manage/clients"
        type="search"
        placeholder="Chercher un client"
      />
      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : clients?.length > 0 ? (
          <Clients data={clients} />
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

      <DataPagination length={clients} />
    </DefaultLayout>
  );
};

export default ClientsPage;
