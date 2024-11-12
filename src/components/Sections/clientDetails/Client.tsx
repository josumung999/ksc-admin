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
import React from "react";
import { UpdateClientButton } from "@/components/Forms/Clients/UpdateClientButton";
import { useRouter } from "next/router";
interface clientPops {
  client: clientType;
}

//////////////////////////////in working ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const ClientDetails: React.FC<clientPops> = ({ client }) => {
  //we need to fetch again the client's data (must implement other features like "purchaced product....")
  const router = useRouter();

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Informations du client"} />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateClientButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        Client details here
      </div>
    </DefaultLayout>
  );
};

export default ClientDetails;
