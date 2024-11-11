"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateClientButton } from "@/components/Forms/Clients/CreateClientButton";
import Clients from "@/components/Tables/Clients";
import { clientType } from "@/components/types_interfaces/clientType";

const ClientsPage = () => {
  const { data, isLoading, error } = useSWR("/api/v1/clients", fetcher);
  const clients: clientType[] = data?.data?.records;

  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Gérer les clients" /> */}

      <div>Some feature coming soon</div>

      {/* <div className="flex w-full flex-row items-center justify-end">
        <CreateClientButton />
      </div> */}

      {/* <div className="flex min-h-screen flex-col gap-10">
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
      </div> */}
    </DefaultLayout>
  );
};

export default ClientsPage;
