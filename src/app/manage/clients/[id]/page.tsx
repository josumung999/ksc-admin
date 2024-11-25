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
import { UpdateClientButton } from "@/components/Forms/Clients/UpdateClientButton";
import ClientDetails from "@/components/Sections/clientDetails/Client";
interface clientPops {
  params: any;
}

//////////////////////////////in working///////////////////////////
//////////////////////////////////////////////////////////////////
const ClientPage: React.FC<clientPops> = ({ params }) => {
  //we need to fetch again the client's data (must implement other features like "purchaced product....")
  const { id } = params;

  const { data, isLoading, error } = useSWR(`/api/v1/client/${id}`, fetcher);

  const client: clientType = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName={client.fullName} />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateClientButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : client ? (
          <ClientDetails client={client} />
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
    </DefaultLayout>
  );
};

export default ClientPage;
